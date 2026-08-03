import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth/auth.js";
import { User } from "../types/auth.types.js";

export interface AuthRequest extends Request {
  user?: User;
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as unknown as Headers,
    });

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = {
      ...session.user,
      image: session.user.image ?? null,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication error",
    });
  }
}
