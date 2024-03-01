import { Router } from "express";
import {
  addMember,
  deleteMemberById,
  getAllMembers,
  getMemberById,
  modifyMember,
} from "../controllers/members";

const memberRoutes = Router();
memberRoutes.get("/", getAllMembers);
memberRoutes.get("/:id", getMemberById);
memberRoutes.post("/", addMember);
memberRoutes.put("/:id", modifyMember);
memberRoutes.delete("/:id",deleteMemberById);

export default memberRoutes;
