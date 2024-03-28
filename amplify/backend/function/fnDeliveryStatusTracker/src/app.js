const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
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
  const courier = tracker.courier(tracker.COURIER.ROYALMAIL.CODE);

  const trackingNumbers = [
    "WG339979238GB",
    "WG339979153GB",
    "WG339979048GB",
    "WG339128200GB",
    "WG330024689GB",
    "WG317952370GB",
    "WG313576660GB",
  ];

  const results = [];

  for (const trackingNumber of trackingNumbers) {
    try {
      const result = await new Promise((resolve, reject) => {
        courier.trace(trackingNumber, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      results.push({ trackingNumber, result });
    } catch (error) {
      console.error(`Error for ${trackingNumber}:`, error);
      results.push({ trackingNumber, error });
    }
  }

  res.json(results);
});

// Export the app object. When executing the application locally this does nothing.
// However, to port it to AWS Lambda, we will create a wrapper around that will load
// the app from this file
module.exports = app;
