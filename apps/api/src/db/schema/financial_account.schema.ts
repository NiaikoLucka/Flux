import { relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { workspace } from "./workspace.schema.js";
import { user } from "./auth.schema.js";
import { transaction } from "./transaction.schema.js";

export const financial_accountTypeEnum = pgEnum("account_type", [
  "BANK",
  "CASH",
  "MOBILE_MONEY",
]);

export const financial_account = pgTable("financial_account", {
  id: uuid("id").defaultRandom().primaryKey(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspace.id, {
      onDelete: "cascade",
    }),

  name: text("name").notNull(),

  type: financial_accountTypeEnum("type").notNull(),

  initialBalance: numeric("initial_balance", {
    precision: 12,
    scale: 2,
  }).default("0"),

  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const financial_accountRelation = relations(
  financial_account,
  ({ one, many }) => ({
    workspace: one(workspace, {
      fields: [financial_account.workspaceId],
      references: [workspace.id],
    }),

    creator: one(user, {
      fields: [financial_account.createdBy],
      references: [user.id],
    }),
    transactions: many(transaction, { relationName: "sourceAccount" }),

    incomingTransfers: many(transaction, {
      relationName: "destinationAccount",
    }),
  }),
);
