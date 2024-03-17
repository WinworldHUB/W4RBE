import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import { AWS_API_CONFIG } from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import { getOrder, listOrders } from "../graphql/queries";
import { Order, OrderStatus } from "../awsApis";
import { createOrder, updateOrder } from "../graphql/mutations";

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
    res.status(500).json({ error: "Failed to retrieve order" });
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
    res.status(500).json({ error: "Failed to retrieve order" });
  }
};

export const getAllOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await client.graphql({
      query: listOrders,
    });

    console.log(orders);
    res.json(orders.data.listOrders.items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

export const addOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = req.body as Order;

    if (!order) {
      res.status(500).json({
        error:
          "Invalid order. Order details are not in correct format or empty",
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
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const modifyOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = req.body as Order;

    if (!order) {
      res.status(500).json({
        error:
          "Invalid order. Order details are not in correct format or empty",
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
    res.status(500).json({ error: "Failed to update order" });
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
        error:
          "Invalid order. Order details are not in correct format or empty",
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
    res.status(500).json({ error: "Failed to delete order" });
  }
};
