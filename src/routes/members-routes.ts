import { Router } from "express";
import {
  addMember,
  changePasswordHandler,
  confirmMember,
  deleteMemberByEmail,
  getAllMembers,
  getMemberByEmail,
  importMembers,
  modifyMember,
  resendCode,
} from "../controllers/members";

const memberRoutes = Router();
memberRoutes.get("/", getAllMembers);
memberRoutes.get("/:email", getMemberByEmail);
memberRoutes.post("/", addMember);
memberRoutes.post("/imports", importMembers);
memberRoutes.post("/confirm", confirmMember);
memberRoutes.post("/resend-code", resendCode);
memberRoutes.post("/change-password", changePasswordHandler);
memberRoutes.put("/:email", modifyMember);
memberRoutes.delete("/:email", deleteMemberByEmail);

export default memberRoutes;
