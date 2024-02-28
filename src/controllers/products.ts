import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import products from "../models/product-data.json"
import { Product } from "../types/product";

const productsFilePath = path.resolve(__dirname, "../models/product-data.json");

const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = products.find((p: Product) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

const createProduct = (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  products.push(newProduct);
  saveProductsToFile(products);
  res.status(201).json({ message: "Product created successfully", product: newProduct });
};

const updateProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const updatedProduct: Product = req.body;
  const index = products.findIndex((p: Product) => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[index] = updatedProduct;
  saveProductsToFile(products);
  res.json({ message: "Product updated successfully", product: updatedProduct });
};

const deleteProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const index = products.findIndex((p: Product) => p.id === productId);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  saveProductsToFile(products);
  res.json({ message: "Product deleted successfully" });
};

function saveProductsToFile(products: Product[]) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
