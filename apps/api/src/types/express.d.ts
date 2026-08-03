import type { User } from "./auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
