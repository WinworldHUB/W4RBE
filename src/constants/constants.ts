import { ResourcesConfig } from "aws-amplify";

export const AWS_API_CONFIG: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: "eu-west-2_Fib3gXgUH",
      userPoolClientId: "15lqu9c3b2kucjkkrtlap6l9k3",
      identityPoolId: "eu-west-2:1b7c6b7d-7c5a-4c9b-8f6b-0e7c9b9c7b7d",
    },
  },
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

export const DELIVERY_TRACKER_CONFIG = {
  apiKeys: {
    royalMail:
      "add65388f669634c0be519b394554285;7e5de56a426b20d53c3c59403ce1a384",
  },
};

export const BREVO_CONFIG = {
  API_KEY_PREFIX: "xkeysib",
  API_KEY_MAJOR:
    "-5deb00a8414aad12909eef9ff1842fb3b38096274baf74d457a4848a061c3372-",
  API_KEY_MINOR: "KBhdySGd7IzrN9jL",
};

export const RECORDS_LIMIT = 10000;
