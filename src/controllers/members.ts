import { generateClient } from "aws-amplify/api";
import { listMembers, getMember } from "../graphql/queries";
import { Amplify, ResourcesConfig } from "aws-amplify";
import { RequestHandler } from "express";
import { Member } from "../awsApis";
import { createMember, updateMember } from "../graphql/mutations";
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

export const getAllMembers:RequestHandler = async (req, res, next) => {
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

export const getMemberById: RequestHandler = async (req, res, next) => {
  try {
    const member = await client.graphql({
      query: getMember,
      variables: { id: req.params.id },
    });
    res.json(member.data.getMember);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "Failed to fetch member" });
  }
};



export const addMember: RequestHandler = async (req, res, next) => {
  try {
    const member = req.body as Member;

    if (member) {
      const newMember = await client.graphql({
        query: createMember,
        variables: {
          input: member,
        },
      });

      res.json(newMember.data.createMember);
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error saving member",
      internalError: error,
    });
  }
};



export const deleteMemberById: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    if (memberId) {
      const foundMember = await client.graphql({
        query: getMember,
        variables: { id: req.params.id },
      });

      if (foundMember) {
        const memberToDelete = foundMember.data.getMember;
        if (memberToDelete.active === false) {
          res.json({ message: "member already inactive" });
          return;
        }
        const input = {
          id: memberToDelete.id,
          active: false,
        };
        const deletedmember = await client.graphql({
          query: updateMember,
          variables: {
            input: input,
          },
        });

        res.json(deletedmember.data.updateMember);
      }
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error deleting member",
      internalError: error,
    });
  }
};
