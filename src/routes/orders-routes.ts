import { Router } from "express";
import {
  addOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  modifyOrder,
} from "../controllers/orders";

const orderRoutes = Router();
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.post("/", addOrder);
orderRoutes.put("/:id", modifyOrder);
orderRoutes.delete("/:id",deleteOrderById);

export default orderRoutes;