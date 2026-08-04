import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { creatWorkspaceController, getUserWorkspaceController } from "./workspace.controller.js";

const router = Router();

router.get("/", requireAuth, getUserWorkspaceController)
router.post("/", requireAuth , creatWorkspaceController)


export default router;