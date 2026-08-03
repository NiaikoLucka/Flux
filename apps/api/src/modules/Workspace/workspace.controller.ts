import type { Request, Response } from "express";

import { createWorkspaceService } from "./workspace.service.js";

export async function creatWorkspaceController(req: Request, res: Response) {
  try {
    const userId = req.user!.id;

    const workspace = await createWorkspaceService(userId, req.body);
    res.status(200).json(workspace);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cannot create workspace",
    });
  }
}
