import { transaction } from "../db/schema/transaction.schema.js";

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type Transaction = InferSelectModel<typeof transaction>;

export type CreateTransaction = InferInsertModel<typeof transaction>;

export type ListTransactionFilters = {
  workspaceId: string;
  accountId?: string;
  type?: "INCOME" | "EXPENSE" | "TRANSFER";
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
};

export type UpdateTransactionInput = Partial<{
  accountId: string;
  toAccountId: string | null;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  amount: string;
  description: string;
  date: Date;
}>;
