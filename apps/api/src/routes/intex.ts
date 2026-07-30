import { Router } from "express";
import TransactionRoute from "../modules/transaction/transaction.routes.js"

const router = Router();

router.use("/transaction", TransactionRoute)

export default router