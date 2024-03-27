import { Router } from "express";

import {
  getInvoiceById,
  getAllInvoices,
  modifyInvoice,
  deleteInvoiceById,
} from "../controllers/invoices";

const invoiceRoutes = Router();

invoiceRoutes.get("/", getAllInvoices);
invoiceRoutes.get("/:id", getInvoiceById);
invoiceRoutes.put("/:id", modifyInvoice);
invoiceRoutes.delete("/:id", deleteInvoiceById);
export default invoiceRoutes;
