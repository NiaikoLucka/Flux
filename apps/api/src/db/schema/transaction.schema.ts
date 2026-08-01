import { relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { financial_account } from "./financial_account.schema.js";
import { workspace } from "./workspace.schema.js";
import { user } from "./auth.schema.js";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "INCOME",
  "EXPENSE",
  "TRANSFER",
]);

export const transaction = pgTable("transaction", {
  id: uuid("id").defaultRandom().primaryKey(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspace.id, {
      onDelete: "cascade",
    }),

  accountId: uuid("account_id")
    .notNull()
    .references(() => financial_account.id, {
      onDelete: "cascade",
    }),

  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),

  type: transactionTypeEnum("type").notNull(),

  amount: numeric("amount", {
    precision: 12,
    scale: 2,
  }).notNull(),

  description: text("description"),

  date: timestamp("date").defaultNow().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const transactionRelations = relations(transaction, ({ one }) => ({
  workspace: one(workspace, {
    fields: [transaction.workspaceId],
    references: [workspace.id],
  }),

  account: one(financial_account, {
    fields: [transaction.accountId],
    references: [financial_account.id],
  }),

  creator: one(user, {
    fields: [transaction.createdBy],
    references: [user.id],
  }),
}));
