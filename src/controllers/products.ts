import { RequestHandler } from "express";
import {
  dbToProduct,
  dbToProducts,
  formatImportedProducts,
  productToDB,
  productToDBForUpdate,
} from "../utils/product-utils";

import { generateClient } from "aws-amplify/api";
import { listProducts, getProduct } from "../graphql/queries";
import { createProduct, updateProduct } from "../graphql/mutations";
import { Product } from "../awsApis";
import { Amplify, ResourcesConfig } from "aws-amplify";
const config: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint:
        "https://srcgirnqdvfpvpaktygytjn2pe.appsync-api.eu-west-2.amazonaws.com/graphql",
      region: "eu-west-2",
      defaultAuthMode: "apiKey",
      apiKey: "da2-tsfh46xxpzgcbfldx6qkees5we",
    },
  },
};

Amplify.configure(config);

const client = generateClient();

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const product = await client.graphql({
      query: getProduct,
      variables: { id: req.params.id },
    });
    res.json(product.data.getProduct);
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
      variables: {
        filter: {
          published: {
            eq: true,
          },
        },
      },
    });

    return res.json(allProducts.data.listProducts.items);
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error retrieving products",
      internalError: error,
    });
  }
};

export const addProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = req.body as Product;

    if (product) {
      const newProduct = await client.graphql({
        query: createProduct,
        variables: {
          input: productToDB(product),
        },
      });

      res.json(newProduct.data.createProduct);
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error saving product",
      internalError: error,
    });
  }
};

export const importProducts: RequestHandler = async (req, res, next) => {
  try {
    const output = {
      failedImport: [],
      successImport: [],
    };

    const productsData = req.body as Product[];
    if (productsData && productsData.length > 0) {
      const formattedProducts = formatImportedProducts(productsData);

      // Use map instead of forEach to handle asynchronous operations
      await Promise.all(
        formattedProducts.map(async (product: Product) => {
          try {
            if (product && product.id !== "") {
              const foundProduct = await client.graphql({
                query: getProduct,
                variables: { id: product.id },
              });

              if (
                foundProduct &&
                foundProduct.data &&
                foundProduct.data.getProduct
              ) {
                const updatedProduct = await client.graphql({
                  query: updateProduct,
                  variables: {
                    input: productToDBForUpdate(product),
                  },
                });
                output.successImport.push(updatedProduct.data.updateProduct);
              } else {
                const createdProduct = await client.graphql({
                  query: createProduct,
                  variables: {
                    input: productToDBForUpdate(product),
                  },
                });
                output.successImport.push(createdProduct.data.createProduct);
              }
            }
          } catch (error) {
            console.log(error);

            output.failedImport.push(product);
          }
        })
      );

      // Send the response after all asynchronous operations are completed
      res.json(output);
    } else {
      res.status(500).json({ error: "No products data provided" });
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error importing products. Please try again later...",
      internalError: error,
    });
  }
};

export const modifyProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = req.body as Product;

    if (product) {
      const newProduct = await client.graphql({
        query: updateProduct,
        variables: {
          input: productToDBForUpdate(product),
        },
      });

      res.json(newProduct.data.updateProduct);
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error updating product",
      internalError: error,
    });
  }
};

export const deleteProductById: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;
    if (productId) {
      const foundProduct = await client.graphql({
        query: getProduct,
        variables: { id: req.params.id },
      });

      if (foundProduct) {
        const productToDelete = foundProduct.data.getProduct;
        if (productToDelete.published === false) {
          res.json({ message: "Product already unpublished" });
          return;
        }
        const input = {
          id: productToDelete.id,
          published: false,
        };
        const deletedProduct = await client.graphql({
          query: updateProduct,
          variables: {
            input: input,
          },
        });

        res.json(deletedProduct.data.updateProduct);
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error deleting product",
      internalError: error,
    });
  }
};
