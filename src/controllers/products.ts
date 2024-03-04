import { RequestHandler } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  insertProduct,
  updateProduct,
  updateProductImages,
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

export const updateProductImagesById: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  const { otherImages } = req.body;

  const updatedProduct = updateProductImages(id, otherImages);

  if (!updatedProduct) {
    res.status(404).json({ message: "Product not found." });
    return;
  }

  res.json(updatedProduct);
};
