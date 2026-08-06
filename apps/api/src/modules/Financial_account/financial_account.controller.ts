import { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import {
  CreatFinancialAccount,
  deleteFinancialAccount,
  listFinancialAccount,
  updateFinancialAccount,
} from "./financial_account.service.js";
import { handleError } from "../../errors/handleError.js";

type Params = {
  workspaceId: string;
  accountId: string;
};

export const CreatFinancialAccountController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;
    const { name, type, initialBalance } = req.body;
    const userId = req.user!.id;

    if (!name || !type) {
      throw new AppError("Name et Type sont requis", 400);
    }

    const financialAccount = await CreatFinancialAccount({
      workspaceId,
      createdBy: userId,
      name,
      type,
      initialBalance,
    });
    return res.status(201).json(financialAccount);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const ListFinacialAccountController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;
    const accounts = await listFinancialAccount(workspaceId);
    return res.status(200).json(accounts);
  } catch (error) {
    // TODO: change all error with handle error
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const UpdateFinancialAccountController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId, accountId } = req.params;
    const { name, type, initialBalance} = req.body;
    console.log("PARAMS :", req.params);
    console.log("BODY :", req.body);

    const account = await updateFinancialAccount({
      accountId,
      workspaceId,
      data: { name, type, initialBalance },
    });
    return res.status(200).json(account);
  } catch (error) {
    handleError(error, res);
  }
};

export const DeleteFinancialAccountController = async (
  req: Request<Params>,
  res: Response,
) => {
  try {
    const { workspaceId, accountId } = req.params;
    const account = await deleteFinancialAccount(accountId, workspaceId);
    return res.status(200).json({message: "account deleted", account});
  } catch (error) {
    handleError(error, res);
  }
};
