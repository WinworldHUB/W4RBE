import { Router } from "express";
import {
  addOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  getOrderByOrderNumber,
  modifyOrder,
  updateDeliveryStatus,
} from "../controllers/orders";

const orderRoutes = Router();
orderRoutes.get("/deliveryStatus", updateDeliveryStatus);
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.get("/ordernumber/:orderNumber", getOrderByOrderNumber);

orderRoutes.post("/", addOrder);
orderRoutes.put("/", modifyOrder);
orderRoutes.delete("/:id", deleteOrderById);

export default orderRoutes;
