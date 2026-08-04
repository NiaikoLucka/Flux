import type { Request, Response, NextFunction } from "express";

import { and, eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { workspaceMember } from "../db/schema/workspace.schema.js";
import {
  roleHasPermission,
  type Permission,
} from "../constants/permissions.js";

type Params = {
  workspaceId: string;
};

export function requirePermission(permission: Permission) {
  return async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Utilisateur non authentifié",
        });
      }

      const { workspaceId } = req.params;

      if (!workspaceId) {
        return res.status(400).json({
          message: "workspaceId manquant",
        });
      }

      const membership = await db.query.workspaceMember.findFirst({
        where: and(
          eq(workspaceMember.workspaceId, workspaceId),
          eq(workspaceMember.userId, req.user.id),
        ),
      });

      if (!membership) {
        return res.status(403).json({
          message: "Vous n'êtes pas membre",
        });
      }

      if (!roleHasPermission(membership.role, permission)) {
        return res.status(403).json({
          message: "Permission insuffisante",
        });
      }

      req.workspaceMembership = membership;

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Erreur serveur",
      });
    }
  };
}
