import { Router } from "express";

import { getInvoiceById, getAllInvoices } from "../controllers/invoices";

const invoiceRoutes = Router();

invoiceRoutes.get("/", getAllInvoices);
invoiceRoutes.get("/:id", getInvoiceById);

export default invoiceRoutes;