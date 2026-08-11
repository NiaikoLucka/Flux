import type { Request, Response } from "express";

import {
  createWorkspaceService,
  getUserWorkspace,
} from "./workspace.service.js";
import { handleError } from "../../errors/handleError.js";

export async function creatWorkspaceController(req: Request, res: Response) {
  try {
    const userId = req.user!.id;

    const workspace = await createWorkspaceService(userId, req.body);
    res.status(200).json(workspace);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getUserWorkspaceController(req: Request, res: Response) {
  try {
    const UserId = req.user!.id;
    const workspaces = await getUserWorkspace(UserId);

    res.status(200).json(workspaces);
  } catch (error) {
    handleError(error, res);
  }
}
