import { Router } from "express";
import TransactionRoute from "../modules/transaction/transaction.routes.js"
import WorkspaceRoute from "../modules/Workspace/workspace.routes.js"

const router = Router();

router.use("/transaction", TransactionRoute)
router.use("/workspaces", WorkspaceRoute)


export default router