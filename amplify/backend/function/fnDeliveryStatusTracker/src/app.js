const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const fetch = require('node-fetch');
const tracker = require("delivery-tracker");

export const AWS_API_CONFIG = {
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

const listOrdersQuery = `
query ListOrders($filter: ModelOrderFilterInput, $limit: Int, $nextToken: String) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      orderNumber
      orderDate
      orderValue
      products
      deliveryDetails
      status
      trackingStatus
      trackingNumber
      packagingType
      memberId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}`;

// Declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", async function (req, res) {
  const filter = { status: { eq: "PROCESSING" } }; // Filter for orders with status PROCESSING

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': AWS_API_CONFIG.API.GraphQL.apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: listOrdersQuery, variables: { filter } })
  };

  try {
    const response = await fetch(AWS_API_CONFIG.API.GraphQL.endpoint, options);
    const data = await response.json();
    const orders = data.data.listOrders.items;

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// Export the app object.
module.exports = app;
