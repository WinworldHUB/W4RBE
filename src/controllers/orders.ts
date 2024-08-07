import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import {
  AWS_API_CONFIG,
  DEFAULT_ORDER_COUNTER_ID,
  DELIVERY_TRACKER_CONFIG,
  RECORDS_LIMIT,
} from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import {
  getMember,
  getOrder,
  getOrderCounter,
  listInvoices,
  listOrders,
} from "../graphql/queries";
import { Order, OrderStatus } from "../awsApis";
import {
  createInvoice,
  createOrder,
  deleteOrder,
  updateInvoice,
  updateOrder,
  updateOrderCounter,
} from "../graphql/mutations";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";
import { sendInvoiceEmail } from "../utils/invoice-email";
import { Tracker } from "parcel-tracker-api";
import { getOrderStatus, trimOrder } from "../utils/order-utils";
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

    res.json(orders.data.listOrders.items[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve order", error: error });
  }
};

export const getAllOrders: RequestHandler = async (req, res, next) => {
  try {
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

    const isAdmin =
      decodedToken["cognito:groups"] &&
      decodedToken["cognito:groups"].includes("admin");

    res.json(await fetchAllOrders(!isAdmin && memberId));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve orders", error: error });
  }
};

const fetchAllOrders = async (memberId?: string): Promise<Order[]> => {
  const variables = memberId
    ? {
        filter: {
          memberId: {
            eq: memberId,
          },
        },
        limit: RECORDS_LIMIT,
        nextToken: null,
      }
    : {
        limit: RECORDS_LIMIT,
        nextToken: null,
      };

  var isDone = false;
  const orders: Order[] = [];
  var nextToken = null;

  do {
    variables.nextToken = nextToken;
    const { data, errors } = await client.graphql({
      query: listOrders,
      variables: variables,
    });

    if (errors) return null;

    orders.push(...data.listOrders.items);
    nextToken = data.listOrders.nextToken;

    isDone = !data.listOrders.nextToken;
  } while (!isDone);

  if (orders) {
    (orders ?? []).sort(
      (a, b) =>
        DateTime.fromISO(b.updatedAt).diff(DateTime.fromISO(a.updatedAt))
          .milliseconds
    );
  }

  return orders;
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

    if (!order.memberId) {
      return res
        .status(500)
        .json({ message: "Invalid order. Member ID is missing." });
    }

    const orderNumber = await generateOrderNumber();

    console.log(`Creating order ${orderNumber}`);
    const newOrder = await client.graphql({
      query: createOrder,
      variables: {
        input: {
          ...order,
          orderNumber: orderNumber,
        },
      },
    });

    if (newOrder.data) {
      const createdOrder = newOrder.data.createOrder;
      const orderId = createdOrder.orderNumber;
      const invoiceDate = createdOrder.orderDate;
      const memberId = createdOrder.memberId;
      const invoiceNumber = "INV-" + orderNumber;

      console.log(`Creating invoice ${newOrder.data.createOrder.orderNumber}`);
      const createdInvoice = await client.graphql({
        query: createInvoice,
        variables: {
          input: {
            id: invoiceNumber,
            orderId: orderId,
            invoiceDate: invoiceDate,
            paymentDate: null,
            memberId: memberId,
          },
        },
      });

      if (createdInvoice.data) {
        console.log(`Invoice created ${createdInvoice.data.createInvoice.id}`);
        const member = await client.graphql({
          query: getMember,
          variables: {
            id: memberId,
          },
        });
        const memberEmail = member.data.getMember.email;

        const isEmailSent = await sendInvoiceEmail(
          createdOrder,
          memberEmail,
          invoiceNumber
        );

        res.json({ createdOrder });
      } else {
        // delete created order

        console.log(`Deleting order ${newOrder.data.createOrder.orderNumber}`);

        const deletedOrder = await client.graphql({
          query: deleteOrder,
          variables: {
            input: {
              id: newOrder.data.createOrder.id,
            },
          },
        });

        if (!deletedOrder.data) {
          res.status(500).json({
            message: `Failed to create order. Please clear residual data for order ${newOrder.data.createOrder.orderNumber}`,
            error: null,
          });
        }

        res
          .status(500)
          .json({ message: "Failed to create order", error: null });
      }
    } else {
      res.status(500).json({ message: "Failed to create order", error: null });
    }
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
              order.trackingStatus = deliveryStatus.status ?? "IN TRANSIT";
            }
            return updateOrderDeliveryStatus(order);
          })
          .catch((error) => {
            output.push("Pending");
            return updateOrderDeliveryStatus({
              ...order,
              trackingStatus: "IN TRANSIT",
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
        await updateInvoicePaymentDate(storedOrder.orderNumber);
      }

      if (storedOrder.status !== updatedOrder.status) {
        await sendStatusEmail(
          updatedOrder.orderNumber,
          memberEmail,
          getOrderStatus(updatedOrder.status)
        );
      }

      res.json(updatedOrder);
    } else {
      res.status(500).json({
        message:
          "Invalid order. Order details are not in correct format or empty",
        error: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update order", error: error });
  }
};

const updateInvoicePaymentDate = async (orderId: string) => {
  try {
    if (!orderId) {
      console.log("Invalid or Empty order ID");
      return;
    }

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
            paymentDate: DateTime.now().toISODate(),
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
    res.json(deletedOrder.data.updateOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete order", error: error });
  }
};

const generateOrderNumber = async () => {
  const { data } = await client.graphql({
    query: getOrderCounter,
    variables: {
      id: DEFAULT_ORDER_COUNTER_ID,
    },
  });

  if (!data) {
    return null;
  }

  if (data.getOrderCounter.orders) {
    const orderNumber = data.getOrderCounter.orders + 1;

    const updatedOrderCounter = await client.graphql({
      query: updateOrderCounter,
      variables: {
        input: {
          id: DEFAULT_ORDER_COUNTER_ID,
          orders: orderNumber,
        },
      },
    });

    if (!updatedOrderCounter) {
      return null;
    }

    return orderNumber.toString();
  }

  return null;
};

export const getOrderNumber: RequestHandler = async (req, res, next) => {
  try {
    res.json({ orderNumber: await generateOrderNumber() });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to generate order number", error: error });
  }
};
