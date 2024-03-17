/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const tracker = require('delivery-tracker');
const listOrders = require('../../../../../src/graphql/queries').listOrders;
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

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
Amplify.configure(AWS_API_CONFIG);


app.get('/track-orders', async (req, res) => {
  try {
    const client = generateClient();
    const orders = await client.graphql({
      query: listOrders,
      variables: {
        filter: {
          orderNumber: {
            eq: req.query.orderNumber
          }
        }
      }
    });

    // Implement your tracking logic here
    const trackingNumbers = orders.data.listOrders.items.map(order => order.trackingNumber);
    const results = {};

    trackingNumbers.forEach(trackingNumber => {
      const courier = tracker.courier(tracker.COURIER.ROYALMAIL.CODE);
      courier.trace(trackingNumber, (err, result) => {
        if (err) {
          console.error(`Error for ${trackingNumber}:`, err);
          results[trackingNumber] = { error: err.message };
        } else {
          console.log(`Tracking Result for ${trackingNumber}:`, result);
          results[trackingNumber] = result;
        }
      });
    });

    res.json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to retrieve orders" });
  }
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
