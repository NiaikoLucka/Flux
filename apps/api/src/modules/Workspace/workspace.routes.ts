import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { creatWorkspaceController } from "./workspace.controller.js";

const router = Router();

router.post("/", requireAuth , creatWorkspaceController)

export default router;