import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { addMember } from "./member.controller.js";

const router = Router({mergeParams: true})

router.post("/" , requireAuth, addMember)

export default router