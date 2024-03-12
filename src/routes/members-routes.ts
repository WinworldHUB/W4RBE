import { Router } from "express";
import { addMember, getAllMembers, getMemberById } from "../controllers/members";

const memberRoutes = Router();
memberRoutes.get("/", getAllMembers);
memberRoutes.get("/:id", getMemberById);
memberRoutes.post("/", addMember);
// memberRoutes.post("/imports", importMembers);
// memberRoutes.put("/:id", modifyMember);
// memberRoutes.delete("/:id", deleteMemberById);

export default memberRoutes;
