import { workspaceMember } from "../db/schema/workspace.schema.ts";
import type { User } from "./auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      workspaceMembership?: typeof workspaceMember.$inferSelect;
    }
  }
}

export {};
