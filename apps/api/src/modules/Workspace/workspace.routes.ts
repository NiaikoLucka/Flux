import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import * as WorkspaceController from "./workspace.controller.js";

const router = Router();

router.get("/", requireAuth, WorkspaceController.getUserWorkspaceController);
router.post("/", requireAuth, WorkspaceController.creatWorkspaceController);

export default router;
