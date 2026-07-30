import { Request, Response } from "express";

export const listTransaction = (req: Request, res: Response) => {
  res.status(200).json({ message: "liste des transaction" });
};

export const getTransactionByID = (req: Request, res: Response) => {
  res.send("liste des transaction par id");
};

export const creatTransaction = (req: Request, res: Response) => {
  console.log(req.body);

  res.send("creat transaction");
};

export const updateTransaction = (req: Request, res: Response) => {
  res.send("update transaction");
};

export const deleteTransaction = (req: Request, res: Response) => {
  res.send("delete transaction");
};
