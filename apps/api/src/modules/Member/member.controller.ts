import { AppError } from "../../errors/AppError.js";
import type { Request, Response } from "express";
import {
  addMemberToWorkspace,
  ListMembersServices,
  removeMembersServices,
  updateMemberRoleService,
} from "./member.service.js";
import { Role } from "../../constants/permissions.js";
import { handleError } from "../../errors/handleError.js";

type Params = {
  workspaceId: string;
  memberId: string;
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
    handleError(error, res);
  }
}

export async function ListMembersControllers(
  req: Request<Params>,
  res: Response,
) {
  try {
    const { workspaceId } = req.params;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspaceId est requis",
      });
    }

    const members = await ListMembersServices(workspaceId);
    return res.status(200).json(members);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateRoleControllers(
  req: Request<Params>,
  res: Response,
) {
  try {
    const { workspaceId, memberId } = req.params;
    const { role }: { role: Role } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Utilisateur non authentifié",
      });
    }

    if (!role) {
      return res.status(400).json({
        message: "role est requis",
      });
    }
    if (!req.workspaceMembership) {
      return res.status(403).json({
        message: "Permission workspace manquante",
      });
    }
    const actorId = req.user.id;
    const actorRole = req.workspaceMembership.role; // peuplé par requirePermission

    if (!role) {
      return res.status(400).json({ message: "role est requis" });
    }

    const updated = await updateMemberRoleService(
      workspaceId,
      actorId,
      memberId,
      role,
      actorRole,
    );
    return res.status(200).json(updated);
  } catch (error) {
    handleError(error, res);
  }
}

export async function removeControllers(req: Request<Params>, res: Response) {
  try {
    const { workspaceId } = req.params;
    const { memberIds } = req.body; // tableau, pour supporter suppression multiple
    if (!req.user) {
      return res.status(401).json({
        message: "Utilisateur non authentifié",
      });
    }
    const actorId = req.user.id;

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res
        .status(400)
        .json({ message: "memberIds doit être un tableau non vide" });
    }

    const result = await removeMembersServices(workspaceId, actorId, memberIds);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error,res)
  }
}
