const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const fetch = require("node-fetch");

const BASE_URL = "https://apis.wholesale4resale.com";

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
  res.send(await fetch(`${BASE_URL}/orders/updateDeliveryStatus`));
});

// Export the app object.
module.exports = app;
