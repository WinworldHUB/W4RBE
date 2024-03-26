import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import { AWS_API_CONFIG } from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import { getInvoice, listInvoices } from "../graphql/queries";
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

    console.log(invoice);
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
