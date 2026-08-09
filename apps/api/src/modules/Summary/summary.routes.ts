import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import * as SummaryController from "./summary.controller.js";

const router = Router({ mergeParams: true });

router.get("/", requireAuth, SummaryController.GetWorkspaceSummaryController);

export default router;