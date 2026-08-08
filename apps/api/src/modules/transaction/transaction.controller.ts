import { Request, Response } from "express";
import { handleError } from "../../errors/handleError.js";
import { AppError } from "../../errors/AppError.js";
import {
  createTransaction,
  deleteTransaction,
  GetAllTransaction,
  getTransactionById,
  updateTransaction,
} from "./transaction.service.js";

type Params = {
  workspaceId: string;
  transactionId: string;
};

export const CreatTransactionController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;
    const { accountId, toAccountId, type, amount, description, date } =
      req.body;
    const createdBy = req.user!.id;
    if (!accountId || !type || !amount) {
      throw new AppError("accountId, type et amount sont requis", 400);
    }

    const newTransaction = await createTransaction({
      workspaceId,
      createdBy,
      accountId,
      toAccountId,
      type,
      amount,
      description,
      date: date ? new Date(date) : undefined,
    });

    return res.status(201).json(newTransaction);
  } catch (error) {
    handleError(error, res);
  }
};

export const ListTransactionController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;
    const { accountId, type, startDate, endDate, page, limit } = req.query;

    const result = await GetAllTransaction({
      workspaceId,
      accountId: accountId as string | undefined,
      type: type as "INCOME" | "EXPENSE" | "TRANSFER" | undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};

export const GetTransactionControllerById = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId, transactionId } = req.params;
    const found = await getTransactionById(transactionId, workspaceId);
    return res.status(200).json(found);
  } catch (error) {
    handleError(error, res);
  }
};

export const UpdateTransactionController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId, transactionId } = req.params;
    const { accountId, toAccountId, type, amount, description, date } =
      req.body;

    const updated = await updateTransaction(transactionId, workspaceId, {
      accountId,
      toAccountId,
      type,
      amount,
      description,
      date: date ? new Date(date) : undefined,
    });

    return res.status(200).json(updated);
  } catch (error) {
    handleError(error, res);
  }
};
export const DeleteTransactionController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId, transactionId } = req.params;
    const result = await deleteTransaction(transactionId, workspaceId);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};
