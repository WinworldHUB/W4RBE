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

const getOrderQuery = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
  }
`;

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
  const id = req.query.id; // Assuming the order ID is passed as a query parameter

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': AWS_API_CONFIG.API.GraphQL.apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: getOrderQuery, variables: { id } })
  };

  try {
    const response = await fetch(AWS_API_CONFIG.API.GraphQL.endpoint, options);
    const data = await response.json();
    
    // Extract the tracking number from the fetched order
    const trackingNumber = data.data.getOrder.trackingNumber;

    // Initialize the courier with the tracking number
    const courier = tracker.courier(tracker.COURIER.ROYALMAIL.CODE);

    // Trace the package with the tracking number
    const result = await new Promise((resolve, reject) => {
      courier.trace(trackingNumber, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.json({ order: data.data.getOrder, trackingResult: result });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order or track package." });
  }
});

// Export the app object.
module.exports = app;
