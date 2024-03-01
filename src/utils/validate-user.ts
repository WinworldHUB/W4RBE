import { Member } from "../types/member";
import {
  getMembers,
  getMember,
  insertMember,
  updateMember,
} from "../models/members-model";
import _ from "lodash";

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
      const foundMember = getMember(newUser.ID);
      if (foundMember) {
        if (!_.isEqual(foundMember, newUser)) {
          updateMember(newUser);
          response.updatedUsers.push(newUser);
        }
      } else {
        insertMember(newUser);
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
