import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { transaction } from "../../db/schema/transaction.schema.js";
import { financial_account } from "../../db/schema/financial_account.schema.js";

export const getWorkspaceSummary = async (workspaceId: string) => {
  // 1. Tous les comptes du workspace
  const accounts = await db
    .select({
      id: financial_account.id,
      name: financial_account.name,
      type: financial_account.type,
      initialBalance: financial_account.initialBalance,
    })
    .from(financial_account)
    .where(eq(financial_account.workspaceId, workspaceId));

  // 2. Agrégation des transactions où le compte est SOURCE (accountId), groupé par compte + type
  const sourceAgg = await db
    .select({
      accountId: transaction.accountId,
      type: transaction.type,
      total: sql<string>`SUM(${transaction.amount})`,
    })
    .from(transaction)
    .where(eq(transaction.workspaceId, workspaceId))
    .groupBy(transaction.accountId, transaction.type);

  // 3. Agrégation des TRANSFER où le compte est DESTINATION (toAccountId)
  const destAgg = await db
    .select({
      accountId: transaction.toAccountId,
      total: sql<string>`SUM(${transaction.amount})`,
    })
    .from(transaction)
    .where(
      and(
        eq(transaction.workspaceId, workspaceId),
        eq(transaction.type, "TRANSFER"),
      ),
    )
    .groupBy(transaction.toAccountId);

  // 4. Map accountId -> mouvements
  const movementsByAccount = new Map<
    string,
    { income: number; expense: number; transferOut: number; transferIn: number }
  >();

  for (const row of sourceAgg) {
    if (!row.accountId) continue;
    const entry = movementsByAccount.get(row.accountId) ?? {
      income: 0,
      expense: 0,
      transferOut: 0,
      transferIn: 0,
    };
    const amount = Number(row.total);
    if (row.type === "INCOME") entry.income += amount;
    else if (row.type === "EXPENSE") entry.expense += amount;
    else if (row.type === "TRANSFER") entry.transferOut += amount;
    movementsByAccount.set(row.accountId, entry);
  }

  for (const row of destAgg) {
    if (!row.accountId) continue;
    const entry = movementsByAccount.get(row.accountId) ?? {
      income: 0,
      expense: 0,
      transferOut: 0,
      transferIn: 0,
    };
    entry.transferIn += Number(row.total);
    movementsByAccount.set(row.accountId, entry);
  }

  // 5. Calcul détaillé par compte + agrégats globaux
  const balanceByType: Record<string, number> = {};
  let totalBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  const accountsDetails = accounts.map((account) => {
    const movements = movementsByAccount.get(account.id) ?? {
      income: 0,
      expense: 0,
      transferOut: 0,
      transferIn: 0,
    };

    const accountBalance =
      Number(account.initialBalance) +
      movements.income -
      movements.expense -
      movements.transferOut +
      movements.transferIn;

    balanceByType[account.type] =
      (balanceByType[account.type] ?? 0) + accountBalance;
    totalBalance += accountBalance;
    totalIncome += movements.income;
    totalExpense += movements.expense;

    return {
      id: account.id,
      name: account.name,
      type: account.type,
      totalIncome: movements.income.toFixed(2),
      totalExpense: movements.expense.toFixed(2),
      totalTransferIn: movements.transferIn.toFixed(2),
      totalTransferOut: movements.transferOut.toFixed(2),
      balance: accountBalance.toFixed(2),
    };
  });

  return {
    accounts: accountsDetails,
    balanceByType: Object.fromEntries(
      Object.entries(balanceByType).map(([type, value]) => [
        type,
        value.toFixed(2),
      ]),
    ),
    totalBalance: totalBalance.toFixed(2),
    totalIncome: totalIncome.toFixed(2),
    totalExpense: totalExpense.toFixed(2),
  };
};
