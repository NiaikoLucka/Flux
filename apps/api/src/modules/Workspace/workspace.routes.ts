import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { addMember, creatWorkspaceController, getUserWorkspaceController } from "./workspace.controller.js";

const router = Router();

router.get("/", requireAuth, getUserWorkspaceController)
router.post("/", requireAuth , creatWorkspaceController)
router.post("/:id/members", requireAuth, addMember);

export default router;