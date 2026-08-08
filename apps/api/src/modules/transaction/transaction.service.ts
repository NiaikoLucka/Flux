import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { financial_account } from "../../db/schema/financial_account.schema.js";
import { AppError } from "../../errors/AppError.js";
import {
  CreateTransaction,
  ListTransactionFilters,
  UpdateTransactionInput,
} from "../../types/transaction.types.js";
import { transaction } from "../../db/schema/transaction.schema.js";

const getAccountInWorkspace = async (
  accountId: string,
  workspaceId: string,
) => {
  const account = await db.query.financial_account.findFirst({
    where: and(
      eq(financial_account.id, accountId),
      eq(financial_account.workspaceId, workspaceId),
    ),
  });

  if (!account) {
    throw new AppError("Compte introuvable dans ce workspace", 404);
  }
  return account;
};
// cree un transaction
export const createTransaction = async (data: CreateTransaction) => {
  const {
    workspaceId,
    createdBy,
    accountId,
    toAccountId,
    type,
    amount,
    description,
    date,
  } = data;

  if (type === "TRANSFER") {
    if (!toAccountId)
      throw new AppError("toAccountId est requis pour un TRANSFER", 400);
    if (toAccountId === accountId)
      throw new AppError(
        "Le compte source et destination doivent être différents",
        400,
      );
  } else if (toAccountId) {
    throw new AppError(
      "toAccountId ne doit être renseigné que pour un TRANSFER",
      400,
    );
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new AppError("amount doit être un nombre positif", 400);
  }
  await getAccountInWorkspace(accountId, workspaceId);
  if (type === "TRANSFER") {
    await getAccountInWorkspace(toAccountId!, workspaceId);
  }

  const [newTransaction] = await db
    .insert(transaction)
    .values({
      workspaceId,
      accountId,
      toAccountId: type === "TRANSFER" ? toAccountId : null,
      createdBy,
      type,
      amount,
      description,
      date: date ?? new Date(),
    })
    .returning();

  return newTransaction;
};

//Get all Transaction

export const GetAllTransaction = async (filters: ListTransactionFilters) => {
  const { workspaceId, accountId, type, startDate, endDate } = filters;
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
  const offset = (page - 1) * limit;

  const conditions = [eq(transaction.workspaceId, workspaceId)];
  if (accountId) conditions.push(eq(transaction.accountId, accountId));
  if (type) conditions.push(eq(transaction.type, type));
  if (startDate) conditions.push(gte(transaction.date, startDate));
  if (endDate) conditions.push(lte(transaction.date, endDate));

  const rows = await db.query.transaction.findMany({
    where: and(...conditions),
    orderBy: [desc(transaction.date)],
    limit,
    offset,
    with: {
      account: { columns: { id: true, name: true, type: true } },
      toAccount: { columns: { id: true, name: true, type: true } },
      creator: { columns: { id: true, name: true } },
    },
  });
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(transaction)
    .where(and(...conditions));

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

// Get One Transacation
export const getTransactionById = async (
  transactionId: string,
  workspaceId: string,
) => {
  const found = await db.query.transaction.findFirst({
    where: and(
      eq(transaction.id, transactionId),
      eq(transaction.workspaceId, workspaceId),
    ),
    with: {
      account: { columns: { id: true, name: true, type: true } },
      toAccount: { columns: { id: true, name: true, type: true } },
      creator: { columns: { id: true, name: true } },
    },
  });

  if (!found) throw new AppError("Transaction introuvable", 404);
  return found;
};

// Update transaction
export const updateTransaction = async (
  transactionId: string,
  workspaceId: string,
  updates: UpdateTransactionInput,
) => {
  const existing = await db.query.transaction.findFirst({
    where: and(
      eq(transaction.id, transactionId),
      eq(transaction.workspaceId, workspaceId),
    ),
  });

  if (!existing) throw new AppError("Transaction introuvable", 404);

  const newType = updates.type ?? existing.type;
  const newAccountId = updates.accountId ?? existing.accountId;
  const newToAccountId =
    updates.toAccountId !== undefined
      ? updates.toAccountId
      : existing.toAccountId;
  const newAmount =
    updates.amount !== undefined
      ? Number(updates.amount)
      : Number(existing.amount);

  if (newType === "TRANSFER") {
    if (!newToAccountId)
      throw new AppError("toAccountId est requis pour un TRANSFER", 400);
    if (newToAccountId === newAccountId)
      throw new AppError(
        "Le compte source et destination doivent être différents",
        400,
      );
  } else if (newToAccountId) {
    throw new AppError(
      "toAccountId ne doit être renseigné que pour un TRANSFER",
      400,
    );
  }

  if (!Number.isFinite(newAmount) || newAmount <= 0) {
    throw new AppError("amount doit être un nombre positif", 400);
  }

  await getAccountInWorkspace(newAccountId, workspaceId);
  if (newType === "TRANSFER") {
    await getAccountInWorkspace(newToAccountId!, workspaceId);
  }

  const [updated] = await db
    .update(transaction)
    .set({
      accountId: newAccountId,
      toAccountId: newType === "TRANSFER" ? newToAccountId : null,
      type: newType,
      amount: String(newAmount),
      description:
        updates.description !== undefined
          ? updates.description
          : existing.description,
      date: updates.date ?? existing.date,
    })
    .where(eq(transaction.id, transactionId))
    .returning();

  return updated;
};

//delete transaction
export const deleteTransaction = async (
  transactionId: string,
  workspaceId: string,
) => {
  const existing = await db.query.transaction.findFirst({
    where: and(
      eq(transaction.id, transactionId),
      eq(transaction.workspaceId, workspaceId),
    ),
  });

  if (!existing) throw new AppError("Transaction introuvable", 404);

  await db.delete(transaction).where(eq(transaction.id, transactionId));

  return { deleted: true, id: transactionId };
};
