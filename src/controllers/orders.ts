import { RequestHandler, response } from "express";
import { Amplify } from "aws-amplify";
import {
  AWS_API_CONFIG,
  DELIVERY_TRACKER_CONFIG,
} from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import {
  getMember,
  getOrder,
  listInvoices,
  listOrders,
} from "../graphql/queries";
import { Order, OrderStatus } from "../awsApis";
import {
  createInvoice,
  createOrder,
  updateInvoice,
  updateOrder,
} from "../graphql/mutations";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";
import { sendInvoiceEmail } from "../utils/invoice-email";
import { Tracker } from "parcel-tracker-api";
import { trimOrder } from "../utils/order-utils";
import { ParcelInformations } from "parcel-tracker-api/dist/lib/apis/parcel-informations";
import { sendStatusEmail } from "../utils/status-email";
Amplify.configure(AWS_API_CONFIG);
const client = generateClient();

export const getOrderById: RequestHandler = async (req, res, next) => {
  try {
    const order = await client.graphql({
      query: getOrder,
      variables: {
        id: req.params.id,
      },
    });

    console.log(order);
    res.json(order.data.getOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve order", error: error });
  }
};
export const getOrderByOrderNumber: RequestHandler = async (req, res, next) => {
  try {
    const orders = await client.graphql({
      query: listOrders,
      variables: {
        filter: {
          orderNumber: {
            eq: req.params.orderNumber,
          },
        },
      },
    });

    console.log(orders);
    res.json(orders.data.listOrders.items[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve order", error: error });
  }
};

export const getAllOrders: RequestHandler = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    const memberId: string = decodedToken.sub;

    let orders: Order[] = [];
    // Check if the user is an admin
    if (
      decodedToken["cognito:groups"] &&
      decodedToken["cognito:groups"].includes("admin")
    ) {
      // If admin, fetch all orders
      const { data } = await client.graphql({
        query: listOrders,
      });
      orders = data.listOrders.items;
    } else {
      // If not admin, fetch orders for the logged in user
      const { data } = await client.graphql({
        query: listOrders,
        variables: {
          filter: {
            memberId: {
              eq: memberId,
            },
          },
        },
      });
      orders = data.listOrders.items;
    }

    res.json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error });
  }
};
export const addOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = req.body as Order;

    if (!order) {
      res.status(500).json({
        message:
        "Invalid order. Order details are not in correct format or empty",
        error: null,
      });
      return;
    }

    if(!order.memberId){
      return res.status(500).json({"message": "Invalid order. Member ID is missing."});
    }

    const orderNumber = await generateOrderNumber(order.memberId);
  
    const newOrder = await client.graphql({
      query: createOrder,
      variables: {
        input: {
          ... order, orderNumber: orderNumber,
        },
      },
    });
    const createdOrder = newOrder.data.createOrder;
    const orderId = createdOrder.orderNumber;
    const invoiceDate = createdOrder.orderDate;
    const memberId = createdOrder.memberId;
    await client.graphql({
      query: createInvoice,
      variables: {
        input: {
          orderId: orderId,
          invoiceDate: invoiceDate,
          paymentDate: null,
          memberId: memberId,
        },
      },
    });
    const member = await client.graphql({
      query: getMember,
      variables: {
        id: memberId,
      },
    });
    const memberEmail = member.data.getMember.email;
    await sendInvoiceEmail(createdOrder, memberEmail, orderNumber);
    res.json({ createdOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create order", error: error });
  }
};

export const updateDeliveryStatus: RequestHandler = async (req, res, next) => {
  try {
    const { data } = await client.graphql({
      query: listOrders,
      variables: {
        filter: {
          status: {
            eq: OrderStatus.PROCESSING,
          },
          and: [
            {
              trackingNumber: {
                ne: null,
              },
              or: [
                {
                  trackingNumber: {
                    ne: "",
                  },
                },
              ],
            },
          ],
        },
      },
    });

    const orders = data.listOrders.items;
    const ordermemberId = orders[0].memberId;

    const member = await client.graphql({
      query: getMember,
      variables: {
        id: ordermemberId,
      },
    });
    const memberEmail = member.data.getMember.email;

    if (orders.length > 0) {
      const output = [];
      const tracker = new Tracker(DELIVERY_TRACKER_CONFIG);

      var promises = orders.map((order) =>
        tracker
          .getTrackingInformations(order.trackingNumber, "Royal Mail")
          .then((deliveryStatus: ParcelInformations) => {
            if (deliveryStatus.isDelivered) {
              order.status = OrderStatus.DONE;
              order.trackingStatus = deliveryStatus.status ?? "DONE";
              output.push("Delivered");
            }
            if (
              order.status.toLowerCase() !== deliveryStatus.status.toLowerCase()
            ) {
              sendStatusEmail(
                order.orderNumber,
                memberEmail,
                deliveryStatus.status ?? "PENDING"
              );
            } else {
              order.trackingStatus = deliveryStatus.status ?? "PENDING";
            }
            return updateOrderDeliveryStatus(order);
          })
          .catch((error) => {
            output.push("Pending");
            return updateOrderDeliveryStatus({
              ...order,
              trackingStatus: "PENDING",
            } as Order);
          })
      );

      Promise.all(promises).then(() => {
        res.json(output);
      });
    }

    // res.status(500).json({ message: "Failed to create order", error: "" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create order", error: error });
  }
};

const updateOrderDeliveryStatus = async (order: Order) => {
  const trimmedOrder = trimOrder(order, false) as Order;
  try {
    console.log(order);
    await client.graphql({
      query: updateOrder,
      variables: {
        input: trimmedOrder,
      },
    });

    Promise.resolve();
  } catch (error) {
    Promise.resolve();
  }
};

export const modifyOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = req.body as Order;

    if (!order) {
      res.status(500).json({
        message:
          "Invalid order. Order details are not in correct format or empty",
        error: null,
      });
      return;
    }

    const getStoredOrder = await client.graphql({
      query: getOrder,
      variables: {
        id: order.id,
      },
    });
    const storedOrder = getStoredOrder.data.getOrder;

    if (storedOrder) {
      const toBeUpdatedOrder = await client.graphql({
        query: updateOrder,
        variables: {
          input: order,
        },
      });
      const updatedOrder = toBeUpdatedOrder.data.updateOrder;
      const member = await client.graphql({
        query: getMember,
        variables: {
          id: updatedOrder.memberId,
        },
      });
      const memberEmail = member.data.getMember.email;

      if (
        storedOrder.status === OrderStatus.UNPAID &&
        updatedOrder.status === OrderStatus.PAID
      ) {
        await updateInvoicePaymentDate(storedOrder.id);
      }

      if (storedOrder.status !== updatedOrder.status) {
        await sendStatusEmail(
          updatedOrder.orderNumber,
          memberEmail,
          updatedOrder.status
        );
      }

      res.json(updatedOrder);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update order", error: error });
  }
};

const updateInvoicePaymentDate = async (orderId: string) => {
  try {
    const getStoredInvoice = await client.graphql({
      query: listInvoices,
      variables: {
        filter: {
          orderId: {
            eq: orderId,
          },
        },
      },
    });

    const storedInvoice =
      (getStoredInvoice.data.listInvoices.items ?? []).length > 0
        ? getStoredInvoice.data.listInvoices.items[0]
        : null;

    if (storedInvoice) {
      await client.graphql({
        query: updateInvoice,
        variables: {
          input: {
            id: storedInvoice.id,
            paymentDate: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }
  } catch (error) {
    console.log("Failed to update invoice payment date:", error);
    throw error;
  }
};

export const deleteOrderById: RequestHandler = async (req, res, next) => {
  try {
    const order = await client.graphql({
      query: getOrder,
      variables: {
        id: req.params.id,
      },
    });

    if (!order) {
      res.status(500).json({
        message:
          "Invalid order. Order details are not in correct format or empty",
        error: null,
      });
      return;
    }

    const updatedOrder = {
      id: order.data.getOrder.id,
      status: OrderStatus.CANCELLED,
    };

    const deletedOrder = await client.graphql({
      query: updateOrder,
      variables: {
        input: updatedOrder,
      },
    });

    console.log(deletedOrder);
    res.json(deletedOrder.data.updateOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete order", error: error });
  }
};

const generateOrderNumber = async (memberId: string) => {
  const { data } = await client.graphql({
    query: listOrders,
    variables: {
      filter: {
        memberId: {
          eq: memberId,
        },
      },
    },
  });
  if (!data) {
    return null;
  }
  const orderSequence = data.listOrders.items.length + 1;
  const orderNumber =
    DateTime.now().toISODate() + "-" + orderSequence.toString();
  return orderNumber;
};

export const getOrderNumber: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "please sign in to use this service" });
    }

    const memberId: string = decodedToken.sub;
    
    res.json({ orderNumber: await generateOrderNumber(memberId)});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to generate order number", error: error });
  }
};
