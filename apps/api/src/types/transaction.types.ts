import { transaction } from "../db/schema/transaction.schema.js";

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type Transaction = InferSelectModel<typeof transaction>;

export type CreateTransaction = InferInsertModel<typeof transaction>;
