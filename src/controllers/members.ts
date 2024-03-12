import { generateClient } from "aws-amplify/api";
import { listMembers, getMember } from "../graphql/queries";
import { Amplify, ResourcesConfig } from "aws-amplify";
//import config from "../aws-exports.js";

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

export const getAllMembers = async (req, res, next) => {
  try {
    const members = await client.graphql({
      query: listMembers,
    });

    console.log(members);
    res.json(members.data.listMembers.items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve members" });
  }
};
