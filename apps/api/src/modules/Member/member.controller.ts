import { AppError } from "../../errors/AppError.js";
import type { Request, Response } from "express";
import { addMemberToWorkspace } from "./member.service.js";

type Params = {
  workspaceId: string;
};

export async function addMember(req: Request<Params>, res: Response) {
  try {
    const { workspaceId } = req.params;
    // const workspaceId = Array.isArray(rawWorkspaceId)
    //   ? rawWorkspaceId[0]
    //   : rawWorkspaceId;
    const { email, role } = req.body;
    if (!workspaceId) {
      return res.status(400).json({ message: "workspaceId est requis" });
    }
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const inviterId = req.user.id;

    if (!email || !role) {
      return res.status(400).json({ message: "email et role sont requis" });
    }

    const member = await addMemberToWorkspace(
      workspaceId,
      inviterId,
      email,
      role,
    );

    return res.status(201).json({ message: "Membre ajouté", member });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
