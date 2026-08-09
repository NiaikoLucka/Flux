import { Request, Response } from "express";
import { handleError } from "../../errors/handleError.js";
import { getWorkspaceSummary } from "./summary.service.js";

type Params = { workspaceId: string };

export const GetWorkspaceSummaryController = async (req: Request<Params>, res: Response) => {
  try {
    const { workspaceId } = req.params;
    const summary = await getWorkspaceSummary(workspaceId);
    return res.status(200).json(summary);
  } catch (error) {
    handleError(error, res);
  }
};