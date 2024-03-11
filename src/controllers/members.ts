import { RequestHandler } from "express";

import { Member } from "../types/member";
import validateMemberData from "../utils/validate-user";
import { forEach } from "lodash";

export const getMemberById: RequestHandler = (req, res, next) => {
  const memberEmail = req.params.email;
  //res.json(getMember(memberEmail));
};

export const getAllMembers: RequestHandler = (req, res, next) => res.json();

export const addMember: RequestHandler = (req, res, next) => {
  const jsonData: Member = req.body;
  const validationResponse = validateMemberData([jsonData]);

  return res.status(200).json(validationResponse);
};

export const importMembers: RequestHandler = (req, res, next) => {
  const jsonData: Member[] = req.body;
  const validationResponse = validateMemberData(jsonData);

  return res.status(200).json(validationResponse);
};

export const modifyMember: RequestHandler = (req, res, next) => {
  res.json();
};

export const deleteMemberById: RequestHandler = (req, res, next) => {
  const memberEmail = req.params.email;
  res.json();
};
