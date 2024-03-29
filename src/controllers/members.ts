import { generateClient } from "aws-amplify/api";
import { SignUpInput, signUp } from "aws-amplify/auth";
import { getMember, listMembers } from "../graphql/queries";
import { Amplify } from "aws-amplify";
import { RequestHandler } from "express";
import { Member } from "../awsApis";
import { createMember, updateMember } from "../graphql/mutations";
import formatMemberData from "../utils/format-user";
import { AWS_API_CONFIG } from "../constants/constants";

Amplify.configure(AWS_API_CONFIG);

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
      },
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
      query: getMember,
      variables: {
        id: req.params.id,
      },
    });

    console.log(members);
    res.json(members.data.getMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve members" });
  }
};

export const getMemberByEmail: RequestHandler = async (req, res, next) => {
  try {
    const members = await client.graphql({
      query: listMembers,
      variables: {
        filter: {
          email: { eq: req.params.email },
        },
      },
    });

    console.log(members);
    res.json(members.data.listMembers.items[0]);
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
      const formattedMembers = formatMemberData(memberData);

      await Promise.all(
        formattedMembers.map(async (member: Member) => {
          try {
            if (member && member.email !== "") {
              const foundMember = await client.graphql({
                query: listMembers,
                variables: {
                  filter: {
                    email: { eq: member.email },
                  },
                },
              });

              if (foundMember?.data?.listMembers?.items?.length > 0) {
                const memberId = foundMember.data.listMembers.items[0].id;
                const updatedMember = await client.graphql({
                  query: updateMember,
                  variables: {
                    input: {
                      id: memberId,
                    },
                  },
                });
                if (updatedMember) {
                  output.successImport.push(updatedMember.data.updateMember);
                } else {
                  output.failedImport.push(updatedMember.data.updateMember);
                }
              } else {
                const createdMember = await client.graphql({
                  query: createMember,
                  variables: {
                    input: member,
                  },
                });

                if (createdMember) {
                  // Register user
                  const signUpDetails: SignUpInput = {
                    username: createdMember.data.createMember.email,
                    password: "Password@1",
                    options: {
                      autoSignIn: true,
                      userAttributes: {
                        email: createdMember.data.createMember.email,
                        name: createdMember.data.createMember.name,
                        email_verified: "true",
                      },
                    },
                  };
                  signUp(signUpDetails)
                    .then((value) => console.log(value))
                    .catch((reason) => console.error(reason));
                  
                  output.successImport.push(createdMember.data.createMember);
                } else {
                  output.failedImport.push(createdMember.data.createMember);
                }
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
      res.status(500).json({ error: "Invalid or empty Members data provided" });
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
    const requestBody = req.body;
    if (email) {
      const foundMember = await client.graphql({
        query: listMembers,
        variables: {
          filter: {
            email: { eq: email },
          },
        },
      });

      if (foundMember && foundMember.data.listMembers.items.length > 0) {
        const memberToUpdate = foundMember.data.listMembers.items[0];

        const input = {
          ...requestBody,
        };

        const updatedMember = await client.graphql({
          query: updateMember,
          variables: {
            input: input,
            condition: { email: { eq: memberToUpdate.email } },
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
            email: { eq: email },
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
