import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth.schema.js";

export const currencyEnum = pgEnum("currency", ["MGA", "EUR", "USD"]);

export const workspace = pgTable("workspace", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  currency: currencyEnum("currency").default("MGA").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const memberRoleEnum = pgEnum("member_role", [
  "OWNER",
  "ADMIN",
  "EDITOR",
  "VIEWER",
]);

export const workspaceMember = pgTable("workspace_member", {
  id: uuid("id").defaultRandom().primaryKey(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspace.id, {
      onDelete: "cascade",
    }),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  role: memberRoleEnum("role").default("VIEWER").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//Relation
export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  owner: one(user, {
    fields: [workspace.ownerId],
    references: [user.id],
  }),

  members: many(workspaceMember),
}));

export const workspaceMemberRelations = relations(
  workspaceMember,
  ({ one }) => ({
    workspace: one(workspace, {
      fields: [workspaceMember.workspaceId],
      references: [workspace.id],
    }),

    user: one(user, {
      fields: [workspaceMember.userId],
      references: [user.id],
    }),
  }),
);
