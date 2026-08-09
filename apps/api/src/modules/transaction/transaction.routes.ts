import { Router } from "express";
import * as TransactionController from "./transaction.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requirePermission } from "../../middlewares/permissions.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router({ mergeParams: true });

router.get("/", requireAuth, TransactionController.ListTransactionController);
router.get(
  "/:transactionId",
  requireAuth,
  TransactionController.GetTransactionControllerById,
);

router.post(
  "/",
  requireAuth,
  requirePermission(PERMISSIONS.TRANSACTION_CREATE),
  TransactionController.CreatTransactionController,
);

router.patch(
  "/:transactionId",
  requireAuth,
  requirePermission(PERMISSIONS.TRANSACTION_UPDATE),
  TransactionController.UpdateTransactionController,
);

router.delete(
  "/:transactionId",
  requireAuth,
  requirePermission(PERMISSIONS.TRANSACTION_DELETE),
  TransactionController.DeleteTransactionController,
);

export default router;
