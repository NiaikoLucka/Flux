import { and, eq, count } from "drizzle-orm";
import { db } from "../../db/index.js";
import { financial_account } from "../../db/schema/financial_account.schema.js";
import { CreateFinancialAccount } from "../../types/financial-account.types.js";
import { AppError } from "../../errors/AppError.js";
import { transaction } from "../../db/schema/transaction.schema.js";

export const CreatFinancialAccount = async (data: CreateFinancialAccount) => {
  const [newAccount] = await db
    .insert(financial_account)
    .values({
      workspaceId: data.workspaceId,
      createdBy: data.createdBy,
      name: data.name,
      type: data.type,
      initialBalance: data.initialBalance || "0",
    })
    .returning();

  return newAccount;
};

export const listFinancialAccount = async (workspaceId: string) => {
  return db.query.financial_account.findMany({
    where: eq(financial_account.workspaceId, workspaceId),
  });
};

// Verifier si le compte exist et appartient au workspace
const getAccountOrThrow = async (accountId: string, workspaceId: string) => {
  const account = await db.query.financial_account.findFirst({
    where: and(
      eq(financial_account.id, accountId),
      eq(financial_account.workspaceId, workspaceId),
    ),
  });
  if (!account) {
    throw new AppError("Compte Introuvable dans ce workspace", 404);
  }

  return account;
};

export const updateFinancialAccount = async ({
  accountId,
  workspaceId,
  data
}: {
  accountId:string;
  workspaceId:string;
  data: Partial<{
    name:string;
    type:"BANK"|"CASH"|"MOBILE_MONEY";
    initialBalance: string;
  }>,
}) => {
  await getAccountOrThrow(accountId, workspaceId); // si introuvable il met 404

  const [update] = await db
    .update(financial_account)
    .set(data)
    .where(eq(financial_account.id, accountId))
    .returning();

  return update;
};

// Effacer le financial account
// avant de suprimer il faut verifier s'il n'y a pas de transaction associer et verifier aussi si le account appartient au work space
const countAccountInTransaction = async (accountId: string) => {
  const result = await db
    .select({ count: count() })
    .from(transaction)
    .where(eq(transaction.accountId, accountId));

  return result[0].count;
};

export const deleteFinancialAccount = async (
  accountId: string,
  workspaceId: string,
) => {
  await getAccountOrThrow(accountId, workspaceId);
  const TransactionCount = await countAccountInTransaction(accountId);

  if (TransactionCount > 0) {
    throw new AppError(
      "Imposible de suprimer ce compte car il possède des transaction",
      409,
    );
  }

  const [deleted] = await db
    .delete(financial_account)
    .where(eq(financial_account.id, accountId))
    .returning();

  return deleted;
};
