import { Router } from "express";

import { getInvoiceById, getAllInvoices, modifyInvoice } from "../controllers/invoices";

const invoiceRoutes = Router();

invoiceRoutes.get("/", getAllInvoices);
invoiceRoutes.get("/:id", getInvoiceById);
invoiceRoutes.put("/:id", modifyInvoice);

export default invoiceRoutes;