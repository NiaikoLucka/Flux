import type { user } from "../db/schema/auth.schema.js";
import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>