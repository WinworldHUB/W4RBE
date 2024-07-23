import { RequestHandler } from "express";
import { Amplify } from "aws-amplify";
import { AWS_API_CONFIG, RECORDS_LIMIT } from "../constants/constants";
import { generateClient } from "aws-amplify/api";
import { getInvoice, listInvoices } from "../graphql/queries";

import { deleteInvoice, updateInvoice } from "../graphql/mutations";
import { Invoice, ModelInvoiceFilterInput } from "../awsApis";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";
import { logException } from "../utils/sentry.utils";

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
    logException(error);
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve invoice", error: error });
  }
};

export const getInvoiceByOrderId: RequestHandler = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    const memberId: string = decodedToken.sub;

    let invoice: Invoice = null;

    const filter2Apply: ModelInvoiceFilterInput = {
      orderId: {
        eq: req.params.id,
      },
    };

    if (
      decodedToken["cognito:groups"] &&
      !decodedToken["cognito:groups"].includes("admin")
    ) {
      filter2Apply.memberId.eq = memberId;
    }

    const { data } = await client.graphql({
      query: listInvoices,
      variables: {
        filter: filter2Apply,
        limit: RECORDS_LIMIT,
      },
    });
    invoice = data.listInvoices.items?.[0];

    res.json(invoice ?? null);
  } catch (error) {
    logException(error);
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve invoices", error: error });
  }
};

export const getAllInvoices: RequestHandler = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    const memberId: string = decodedToken.sub;

    let invoices: Invoice[] = [];
    // Check if the user is an admin
    if (
      decodedToken["cognito:groups"] &&
      decodedToken["cognito:groups"].includes("admin")
    ) {
      // If admin, fetch all invoices
      const { data } = await client.graphql({
        query: listInvoices,
      });
      invoices = data.listInvoices.items;
    } else {
      // If not admin, fetch invoices for the logged in user
      const { data } = await client.graphql({
        query: listInvoices,
        variables: {
          filter: {
            memberId: {
              eq: memberId,
            },
          },
          limit: RECORDS_LIMIT,
        },
      });
      invoices = data.listInvoices.items;
    }

    (invoices ?? []).sort(
      (a, b) =>
        DateTime.fromISO(b.invoiceDate).diff(DateTime.fromISO(a.invoiceDate))
          .milliseconds
    );
    res.json(invoices);
  } catch (error) {
    logException(error);
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve invoices", error: error });
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
        },
      },
    });
    res.json(updatedInvoice.data.updateInvoice);
  } catch (error) {
    logException(error);
    console.log(error);
    res.status(500).json({ message: "Failed to update invoice", error: error });
  }
};

export const deleteInvoiceById: RequestHandler = async (req, res, next) => {
  try {
    const invoice = req.params.id;
    const deletedInvoice = await client.graphql({
      query: deleteInvoice,
      variables: {
        input: {
          id: invoice,
        },
      },
    });
    res.json(deletedInvoice.data.deleteInvoice);
  } catch (error) {
    logException(error);
    console.log(error);
    res.status(500).json({ message: "Failed to delete invoice", error: error });
  }
};
