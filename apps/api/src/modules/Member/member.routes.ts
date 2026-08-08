import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import * as MembersController from "./member.controller.js";
import { requirePermission } from "../../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router({ mergeParams: true });

router.get("/", requireAuth, MembersController.ListMembersControllers);
router.post(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.MEMBER_INVITE),
  MembersController.addMember,
);
router.patch(
  "/:memberId",
  requireAuth,
  requirePermission(PERMISSIONS.MEMBER_UPDATE_ROLE),
  MembersController.updateRoleControllers,
);
router.delete(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.MEMBER_REMOVE),
  MembersController.removeControllers,
);

export default router;
