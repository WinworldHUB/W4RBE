import { Router } from "express";
import {
  addMember,
  deleteMemberByEmail,
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
memberRoutes.put("/:email", modifyMember);
memberRoutes.delete("/:email", deleteMemberByEmail);

export default memberRoutes;
