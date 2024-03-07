import { RequestHandler } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  insertProduct,
  updateProduct,
} from "../models/products-model";
import { Product } from "../types/product";
import { forEach } from "lodash";
import { formatProducts } from "../utils/format-product";

export const getProductById: RequestHandler = (req, res, next) =>
  res.json(getProduct(req.params.id));

export const getAllProducts: RequestHandler = (req, res, next) =>
  res.json(getProducts());

export const addProduct: RequestHandler = (req, res, next) => {
  res.json(insertProduct(req.body as Product));
};

export const importProducts: RequestHandler = (req, res, next) => {
  const productsData = req.body as Product[];
  if (productsData) {
    const formattedProducts = formatProducts(productsData);
    forEach(formattedProducts, (product: Product) => {
      if (product && product.id !== "") {
        const foundProduct = getProduct(product.id);

        if (!foundProduct) {
          insertProduct(product);
        } else {
          updateProduct(product);
        }
      }
    });
    res.json(formattedProducts);
  } else {
    res.status(400).json({ error: "No product data provided" });
  }
};

export const modifyProduct: RequestHandler = (req, res, next) => {
  res.json(updateProduct(req.body as Product));
};

export const deleteProductById: RequestHandler = (req, res, next) => {
  res.json(deleteProduct(req.params.id));
};
