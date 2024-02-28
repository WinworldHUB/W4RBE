import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./controllers/products";

const app = express();
const PORT = 3000;

app.use(express.json());

// Get all products
app.get("/products", getProducts);

// Get a single product by ID
app.get("/products/:id", getProductById);

// Create a new product
app.post("/products", createProduct);

// Update a product by ID
app.put("/products/:id", updateProduct);

// Delete a product by ID
app.delete("/products/:id", deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
