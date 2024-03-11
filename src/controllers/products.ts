import { RequestHandler } from "express";
import { Product } from "../types/product";
import { forEach } from "lodash";
import { formatImportedProducts } from "../utils/product-utils";

import { generateClient } from "aws-amplify/api";
import { listProducts, getProduct } from "../graphql/queries";

const client = generateClient();

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    //const product = await getProduct();
    //res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    // List all items
    const allProducts = await client.graphql({
      query: listProducts,
    });

    console.log(allProducts.data.listProducts.items);

    return res.json(allProducts.data.listProducts.items);
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: "Error retrieving products",
      internalError: error,
    });
  }
};

export const addProduct: RequestHandler = (req, res, next) => {
  //res.json(insertProduct(req.body as Product));
};

export const importProducts: RequestHandler = (req, res, next) => {
  const productsData = req.body as Product[];
  if (productsData) {
    const formattedProducts = formatImportedProducts(productsData);
    forEach(formattedProducts, (product: Product) => {
      if (product && product.id !== "") {
        const foundProduct = {}; //getProduct(product.id);

        if (!foundProduct) {
          //insertProduct(product);
        } else {
          //updateProductModel(product);
        }
      }
    });
    res.json(formattedProducts);
  } else {
    res.status(400).json({ error: "No product data provided" });
  }
};

export const modifyProduct: RequestHandler = (req, res, next) => {
  //res.json(updateProductModel(req.body as Product));
};

export const deleteProductById: RequestHandler = (req, res, next) => {
  //deleteProductModel(req.params.id);
  res.json({ message: "Product deleted Successfully" });
};
