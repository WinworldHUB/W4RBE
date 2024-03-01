import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  modifyProduct,
} from "../controllers/products";

const productRoutes = Router();
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", addProduct);
productRoutes.put("/:id", modifyProduct);
productRoutes.delete("/:id", deleteProductById);

export default productRoutes;
