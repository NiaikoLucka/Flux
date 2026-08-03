import { workspace, workspaceMember } from "../db/schema/workspace.schema.js";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Types for workspace
export type Workspace = InferSelectModel<typeof workspace>;
export type creatWorkspace = InferInsertModel<typeof workspace>;

// Types for workspace member
export type WorkspaceMember = InferSelectModel<typeof workspaceMember>