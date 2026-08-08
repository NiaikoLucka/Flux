import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import * as FinancialAccountController from "./financial_account.controller.js";
import { requirePermission } from "../../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router({ mergeParams: true });

router.get("/", requireAuth,FinancialAccountController.ListFinacialAccountController);

router.post(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.ACCOUNT_CREATE),
  FinancialAccountController.CreatFinancialAccountController,
);

router.patch(
  "/:accountId",
  requireAuth,
  requirePermission(PERMISSIONS.ACCOUNT_UPDATE),
  FinancialAccountController.UpdateFinancialAccountController,
);

router.delete(
  "/:accountId",
  requireAuth,
  requirePermission(PERMISSIONS.ACCOUNT_DELETE),
  FinancialAccountController.DeleteFinancialAccountController,
);

export default router 