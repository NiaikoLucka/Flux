import { Router } from "express";
import {
  creatTransaction,
  getTransactionByID,
  listTransaction,
  updateTransaction,
  deleteTransaction,
} from "./transaction.controller.js";

const router = Router();

router.get("/", listTransaction);
router.get("/:id", getTransactionByID);
router.post("/", creatTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
