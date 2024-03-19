import { Router } from "express";
import {
  addMember,
  deleteMemberByEmail,
  getAllMembers,
  getMemberByEmail,
  importMembers,
  modifyMember,
} from "../controllers/members";

const memberRoutes = Router();
memberRoutes.get("/", getAllMembers);
memberRoutes.get("/:email", getMemberByEmail);
memberRoutes.post("/", addMember);
memberRoutes.post("/imports", importMembers);
memberRoutes.put("/:email", modifyMember);
memberRoutes.delete("/:email", deleteMemberByEmail);

export default memberRoutes;
