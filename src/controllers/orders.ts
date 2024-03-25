import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import { AWS_API_CONFIG } from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import { getOrder, listOrders } from "../graphql/queries";
import { Order, OrderStatus } from "../awsApis";
import { createOrder, updateOrder } from "../graphql/mutations";
import jwt from "jsonwebtoken";

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
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    const memberId: string = decodedToken.sub;
    
    let orders: Order[] = [];
    // Check if the user is an admin
    if (decodedToken['cognito:groups'] && decodedToken['cognito:groups'].includes('admin')) {
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
    res.status(500).json({ message: "Failed to retrieve orders", error: error });
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

    const newOrder = await client.graphql({
      query: createOrder,
      variables: {
        input: order,
      },
    });

    console.log(newOrder);
    res.json(newOrder.data.createOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create order", error: error });
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

    const updatedOrder = await client.graphql({
      query: updateOrder,
      variables: {
        input: order,
      },
    });

    console.log(updatedOrder);
    res.json(updatedOrder.data.updateOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update order", error: error });
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
