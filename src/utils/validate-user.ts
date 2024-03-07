import { Member } from "../types/member";
import { getMember, insertMember, updateMember } from "../models/members-model";
import _ from "lodash";
import {
  AuthUser,
  SignUpInput,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import config from "../amplifyconfiguration.json";
import { Amplify } from "aws-amplify";


Amplify.configure(config);
const validateMemberData = (
  jsonData: Member[]
): {
  newUsers: Member[];
  updatedUsers: { id: number; updatedFields: string[] }[];
  errors: string[];
} => {
  const response = {
    newUsers: [],
    updatedUsers: [],
    errors: [],
  };

  jsonData.forEach((newUser) => {
    const requiredFields = [
      "ID",
      "Customer ID",
      "Customer email",
      "Customer name",
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        !newUser.hasOwnProperty(field) ||
        !newUser[field] ||
        (typeof newUser[field] === "string" && newUser[field].trim() === "")
    );

    if (missingFields.length === 0) {
      const foundMember = getMember(newUser["Customer email"]);
      if (foundMember) {
        if (!_.isEqual(foundMember, newUser)) {
          updateMember(newUser);
          response.updatedUsers.push(newUser);
        }
      } else {
        const insertedMember = insertMember(newUser);
        if (insertedMember) {
          const signUpDetails: SignUpInput = {
            username: insertedMember["Customer email"],
            password: "Password@1",
            options: {
              autoSignIn: true,
              userAttributes: {
                email: insertedMember["Customer email"],
                name: insertedMember["Customer name"],
              },
            },
          };
          signUp(signUpDetails)
            .then((value) => console.log(value))
            .catch((reason) => console.error(reason));
        }
        response.newUsers.push(newUser);
      }
    } else {
      missingFields.forEach((field) => {
        response.errors.push(
          `Member is missing required field '${field}'. It will not be saved.`
        );
      });
    }
  });

  return response;
};

export default validateMemberData;
