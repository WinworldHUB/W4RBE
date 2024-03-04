import { RequestHandler } from "express";
import {
  deleteMember,
  getMember,
  getMembers,
  insertMembers,
  updateMember,
} from "../models/members-model";

import { Member } from "../types/member";
import validateMemberData from "../utils/validate-user";

export const getMemberById: RequestHandler = (req, res, next) => {
  const memberId = parseInt(req.params.id, 10);
  res.json(getMember(memberId));
};

export const getAllMembers: RequestHandler = (req, res, next) =>
  res.json(getMembers());

  export const addMember: RequestHandler = (req, res, next) => {
    const jsonData: Member[] = req.body;
    const validationResponse = validateMemberData(jsonData);
  
    return res.status(200).json(validationResponse);
  };

export const modifyMember: RequestHandler = (req, res, next) => {
  res.json(updateMember(req.body as Member));
};

export const deleteMemberById: RequestHandler = (req, res, next) => {
  const memberId = parseInt(req.params.id, 10);
  res.json(deleteMember(memberId));
};
