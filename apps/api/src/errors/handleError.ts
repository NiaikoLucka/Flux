import type { Response } from "express";
import { AppError } from "./AppError.js";

export function handleError(error: unknown, res: Response) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      success: false,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
