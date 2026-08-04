import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { addMember, ListMembersControllers, removeControllers, updateRoleControllers } from "./member.controller.js";
import { requirePermission } from "../../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router({ mergeParams: true });

router.get("/", requireAuth, ListMembersControllers);
router.post(  
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.MEMBER_INVITE),
  addMember,
);
router.patch("/:memberId", requireAuth, requirePermission(PERMISSIONS.MEMBER_UPDATE_ROLE), updateRoleControllers)
router.delete("/", requireAuth, requirePermission(PERMISSIONS.MEMBER_REMOVE), removeControllers)

export default router;
