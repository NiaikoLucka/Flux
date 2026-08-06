import { Router } from "express";
import TransactionRoute from "../modules/transaction/transaction.routes.js"
import WorkspaceRoute from "../modules/Workspace/workspace.routes.js"
import MembersRoute from "../modules/Member/member.routes.js"
import  FinancialAccountRouter  from "../modules/Financial_account/financial_account.routes.js"


const router = Router();

router.use("/transaction", TransactionRoute)
router.use("/workspaces", WorkspaceRoute)
router.use("/workspaces/:workspaceId/members", MembersRoute)
router.use("/workspaces/:workspaceId/financial_accounts", FinancialAccountRouter)

export default router