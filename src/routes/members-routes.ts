import { Router } from "express";
import {
  addMember,
  deleteMemberById,
  getAllMembers,
  getMemberById,
  importMembers,
  modifyMember,
} from "../controllers/members";

const memberRoutes = Router();
memberRoutes.get("/", getAllMembers);
memberRoutes.get("/:email", getMemberById);
memberRoutes.post("/", addMember);
memberRoutes.post("/imports", importMembers);
memberRoutes.put("/:id", modifyMember);
memberRoutes.delete("/:id", deleteMemberById);

export default memberRoutes;
