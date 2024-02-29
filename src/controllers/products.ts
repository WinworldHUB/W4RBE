import { RequestHandler } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  insertProduct,
  updateProduct,
} from "../models/products-model";
import { Product } from "../types/product";

export const getProductById: RequestHandler = (req, res, next) =>
  res.json(getProduct(req.params.id));

export const getAllProducts: RequestHandler = (req, res, next) =>
  res.json(getProducts());

export const addProduct: RequestHandler = (req, res, next) => {
  res.json(insertProduct(req.body as Product));
};

export const modifyProduct: RequestHandler = (req, res, next) => {
  res.json(updateProduct(req.body as Product));
};

export const deleteProductById: RequestHandler = (req, res, next) => {
  res.json(deleteProduct(req.params.id));
};
