import { Router } from "express";
import TransactionRoute from "../modules/transaction/transaction.routes.js"
import WorkspaceRoute from "../modules/Workspace/workspace.routes.js"
import MembersRoutes from "../modules/Member/member.routes.js"
import  FinancialAccountRoutes  from "../modules/Financial_account/financial_account.routes.js"
import TransactionRoutes from "../modules/transaction/transaction.routes.js"
import SummaryRoutes from "../modules/Summary/summary.routes.js"

const router = Router();

router.use("/transaction", TransactionRoute)
router.use("/workspaces", WorkspaceRoute)
router.use("/workspaces/:workspaceId/members", MembersRoutes)
router.use("/workspaces/:workspaceId/financial_accounts", FinancialAccountRoutes)
router.use("/workspaces/:workspaceId/transactions", TransactionRoutes)
router.use("/workspaces/:workspaceId/summary", SummaryRoutes)

export default router