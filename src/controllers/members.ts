import { generateClient } from "aws-amplify/api";
import { listMembers, getMember } from "../graphql/queries";
import { Amplify, ResourcesConfig } from "aws-amplify";
import { RequestHandler } from "express";
import { Member } from "../awsApis";
import { createMember, updateMember } from "../graphql/mutations";
import formatMemberData from "../utils/format-user";
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

export const getAllMembers: RequestHandler = async (req, res, next) => {
  try {
    const members = await client.graphql({
      query: listMembers,
      variables: {
        filter: {
          active: {
            eq: true,
          },
        },
      }
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
    const members = await client.graphql({
      query: listMembers,
      variables: {
        filter: {
          email: { eq: req.params.email }
        }
        
      }
    });

    console.log(members);
    res.json(members.data.listMembers.items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve members" });
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
export const importMembers: RequestHandler = async (req, res, next) => {
  try {
    const output = {
      failedImport: [],
      successImport: [],
    };

    const memberData = req.body;
    if (memberData && Array.isArray(memberData) && memberData.length > 0) {
      const formattedMember = formatMemberData(memberData);

      await Promise.all(
        formattedMember.map(async (member: Member) => {
          try {
            if (member && member.email !== "") {
              const foundMember = await client.graphql({
                query: listMembers,
                variables: {
                  filter: {
                    email: { eq: member.email }
                  }
                }
              });

              if (
                foundMember &&
                foundMember.data &&
                foundMember.data.listMembers.items.length > 0
              ) {
                const memberId = foundMember.data.listMembers.items[0].id;
                const updatedMember = await client.graphql({
                  query: updateMember,
                  variables: {
                    input: {
                      id: memberId,
                      // You need to provide other fields to update here
                    },
                  },
                });
                output.successImport.push(updatedMember.data.updateMember);
              } else {
                const createdMember = await client.graphql({
                  query: createMember,
                  variables: {
                    input: member,
                  },
                });
                output.successImport.push(createdMember.data.createMember);
              }
            }
          } catch (error) {
            console.log(error);
            output.failedImport.push(member);
          }
        })
      );

      res.json(output);
    } else {
      res.status(400).json({ error: "Invalid or empty Members data provided" });
    }
  } catch (error) {
    console.log(error);
    
    return res.status(500).send({
      status: "failed",
      message: "Error importing members. Please try again later...",
      internalError: error,
    });
  }
};

export const modifyMember: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email;
    if (email) {
      const foundMember = await client.graphql({
        query: listMembers,
        variables: {
          filter: {
            email: { eq: email }
          },
        },
      });

      if (foundMember && foundMember.data.listMembers.items.length > 0) {
        const memberToUpdate = foundMember.data.listMembers.items[0];
        const input = {
          id: memberToUpdate.id,
          active: true,
        };
        const updatedMember = await client.graphql({
          query: updateMember,
          variables: {
            input: input,
          },
        });

        res.json(updatedMember.data.updateMember);
      } else {
        res.status(404).json({ error: "Member not found" });
      }
    } else {
      res.status(400).json({ error: "Email parameter missing" });
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error updating member",
      internalError: error,
    });
  }
};

export const deleteMemberByEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email;
    if (email) {
      const foundMember = await client.graphql({
        query: listMembers,
        variables: {
          filter: {
            email: { eq: email }
          },
        },
      });

      if (foundMember && foundMember.data.listMembers.items.length > 0) {
        const memberToDelete = foundMember.data.listMembers.items[0];
        if (memberToDelete.active === false) {
          res.json({ message: "Member already inactive" });
          return;
        }
        const input = {
          id: memberToDelete.id,
          active: false,
        };
        const deletedMember = await client.graphql({
          query: updateMember,
          variables: {
            input: input,
          },
        });

        res.json(deletedMember.data.updateMember);
      } else {
        res.status(404).json({ error: "Member not found" });
      }
    } else {
      res.status(400).json({ error: "Email parameter missing" });
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Error deleting member",
      internalError: error,
    });
  }
};
