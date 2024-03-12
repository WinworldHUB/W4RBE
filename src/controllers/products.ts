import { RequestHandler } from "express";
import { forEach } from "lodash";
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

const client = generateClient();

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const product = await client.graphql({
      query: getProduct,
      variables: { id: req.params.id },
    });
    res.json(dbToProduct(product.data.getProduct));
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

    return res.json(dbToProducts(allProducts.data.listProducts.items));
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
      forEach(formattedProducts, async (product: Product) => {
        if (product && product.id !== "") {
          client
            .graphql({
              query: getProduct,
              variables: { id: product.id },
            })
            .then((foundProduct) => {
              if (foundProduct) {
                client
                  .graphql({
                    query: updateProduct,
                    variables: {
                      input: productToDBForUpdate(product),
                    },
                  })
                  .then((updatedProduct) =>
                    output.successImport.push(updatedProduct.data.updateProduct)
                  )
                  .catch((reason) => output.failedImport.push(product));
              } else {
                client
                  .graphql({
                    query: createProduct,
                    variables: {
                      input: productToDBForUpdate(product),
                    },
                  })
                  .then((createdProduct) =>
                    output.successImport.push(createdProduct.data.createProduct)
                  )
                  .catch((reason) => output.failedImport.push(product));
              }
            });
        }
      });
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
  //deleteProductModel(req.params.id);
  //res.json({ message: "Product deleted Successfully" });
  try {
    const productId = req.params.id;
    if (productId) {
      const foundProduct = await client.graphql({
        query: getProduct,
        variables: { id: req.params.id },
      });

      if (foundProduct) {
        const productToDelete = foundProduct.data.getProduct;
        productToDelete.published = false;
        const deletedProduct = await client.graphql({
          query: updateProduct,
          variables: {
            input: productToDelete,
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
