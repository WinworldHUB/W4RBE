import { RequestHandler } from "express";
import { generateClient } from "aws-amplify/api";
import { listOrders } from "../graphql/queries";
import { Amplify, ResourcesConfig } from "aws-amplify";
import { Order } from "../types/orders";
const config: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint:
        "https://srcgirnqdvfpvpaktygytjn2pe.appsync-api.eu-west-2.amazonaws.com/graphql",
      region: "eu-west-2",
      defaultAuthMode: "apiKey",
      apiKey: "da2-tsfh46xxpzgcbfldx6qkees5we",
    },
  },
};

Amplify.configure(config);

const client = generateClient();
export const getOrderById: RequestHandler = (req, res, next) => {
  
};

export const getAllOrders: RequestHandler = (req, res, next) => res.json();

export const addOrder: RequestHandler = (req, res, next) => {
  res.json();
};

export const modifyOrder: RequestHandler = (req, res, next) => {
  res.json();
};

export const deleteOrderById: RequestHandler = (req, res, next) => {
  res.json();
};
