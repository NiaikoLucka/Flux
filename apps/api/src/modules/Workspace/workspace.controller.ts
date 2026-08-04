import type { Request, Response } from "express";

import {
  addMemberToWorkspace,
  createWorkspaceService,
  getUserWorkspace,
} from "./workspace.service.js";
import { AppError } from "../../errors/AppError.js";

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

export async function getUserWorkspaceController(req: Request, res: Response) {
  try {
    const UserId = req.user!.id;
    const workspaces = await getUserWorkspace(UserId);

    res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des workspaces" });
  }
}

// TODO: À deplacer dans le modules/membres correspondant pour plus de faciliter le routes,controlleur, et services

export async function addMember(req: Request, res: Response) {
  try {
    const rawWorkspaceId = req.params.id;
    const workspaceId = Array.isArray(rawWorkspaceId)
      ? rawWorkspaceId[0]
      : rawWorkspaceId;
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
    if (error instanceof AppError){
      return res.status(error.status).json({message: error.message})
    }
  }
}
