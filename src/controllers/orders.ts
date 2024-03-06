import { RequestHandler } from "express";
import {
  insertOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../models/orders-model";
import { Order } from "../types/orders";

export const getOrderById: RequestHandler = (req, res, next) =>
  res.json(getOrder(req.params.id));

export const getAllOrders: RequestHandler = (req, res, next) =>
  res.json(getOrders());

export const addOrder: RequestHandler = (req, res, next) => {
  res.json(insertOrder(req.body as Order));
};

export const modifyOrder: RequestHandler = (req, res, next) => {
  res.json(updateOrder(req.body as Order));
};

export const deleteOrderById: RequestHandler = (req, res, next) => {
  res.json(deleteOrder(req.params.id));
};
