import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { addMember } from "./member.controller.js";
import { requirePermission } from "../../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.MEMBER_INVITE),
  addMember,
);

export default router;
