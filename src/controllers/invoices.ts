import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import { AWS_API_CONFIG } from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import { getInvoice, listInvoices } from "../graphql/queries";

import { deleteInvoice, updateInvoice } from "../graphql/mutations";
import { Invoice } from "../awsApis";
import jwt from "jsonwebtoken";

Amplify.configure(AWS_API_CONFIG);
const client = generateClient();

export const getInvoiceById: RequestHandler = async (req, res, next) => {
  try {
    const invoice = await client.graphql({
      query: getInvoice,
      variables: {
        id: req.params.id,
      },
    });
    res.json(invoice.data.getInvoice);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve invoice", error: error });
  }
};

export const getAllInvoices: RequestHandler = async (req, res, next) => {
    try{
        const invoices = await client.graphql({
            query: listInvoices,
            variables: {}
        });
        res.json(invoices.data.listInvoices.items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Failed to retrieve invoices", error: error});
    }
};


export const modifyInvoice: RequestHandler = async (req, res, next) => {
    try {
        const invoice = req.body as Invoice;
        if (!invoice) {
            res.status(500).json({
              message:
                "Invalid order. Order details are not in correct format or empty",
              error: null,
            });
            return;
          }
      
        const updatedInvoice = await client.graphql({
            query: updateInvoice,
            variables: {
                input: {
                    id: invoice.id,
                }
            }
        })
        res.json(updatedInvoice.data.updateInvoice);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update invoice", error: error });
    }
}

export const deleteInvoiceById: RequestHandler = async (req, res, next) => {
    try {
        const invoice = req.params.id;
        const deletedInvoice = await client.graphql({
            query: deleteInvoice,
            variables: {
                input: {
                    id: invoice
                }
            }
        });
        res.json(deletedInvoice.data.deleteInvoice);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete invoice", error: error });
    }
}