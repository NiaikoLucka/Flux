import type { financial_account } from "../db/schema/financial_account.schema.js";

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type FinancialAccount = InferSelectModel<typeof financial_account>;

export type CreateFinancialAccount = InferInsertModel<typeof financial_account>;
