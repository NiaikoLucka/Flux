import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  CreatFinancialAccountController,
  DeleteFinancialAccountController,
  ListFinacialAccountController,
  UpdateFinancialAccountController,
} from "./financial_account.controller.js";
import { requirePermission } from "../../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router({ mergeParams: true });

router.get("/", requireAuth, ListFinacialAccountController);

router.post(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.ACCOUNT_CREATE),
  CreatFinancialAccountController,
);

router.patch(
  "/:accountId",
  requireAuth,
  requirePermission(PERMISSIONS.ACCOUNT_UPDATE),
  UpdateFinancialAccountController,
);

router.delete(
  "/:accountId",
  requireAuth,
  requirePermission(PERMISSIONS.ACCOUNT_DELETE),
  DeleteFinancialAccountController,
);

export default router 