import { RequestHandler } from "express";
import { Order } from "../types/orders";

export const getOrderById: RequestHandler = (req, res, next) => res.json();

export const getAllOrders: RequestHandler = (req, res, next) => res.json();

export const addOrder: RequestHandler = (req, res, next) => {
  res.json();
};

export const modifyOrder: RequestHandler = (req, res, next) => {
  res.json();
};

export const deleteOrderById: RequestHandler = (req, res, next) => {
  res.json();
};
