import { doublePrecision, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
  "transfer",
]);

export const usersTable = pgTable("transaction", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: transactionTypeEnum("type").notNull(),
  amount: doublePrecision().notNull(),
  description: varchar({length: 250}),
  transferID: uuid("transfer_id")
});
