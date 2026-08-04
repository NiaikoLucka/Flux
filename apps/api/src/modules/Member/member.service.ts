import { and, eq, inArray } from "drizzle-orm";
import { db } from "../../db/index.js";
import { workspaceMember } from "../../db/schema/workspace.schema.js";
import { AppError } from "../../errors/AppError.js";
import { user } from "../../db/schema/auth.schema.js";
import { email } from "better-auth";

const ALLOWED_INVITER_ROLE = ["OWNER", "ADMIN"];

// Add a new member of workspace
export async function addMemberToWorkspace(
  workspaceId: string,
  invitedId: string,
  email: string,
  role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER",
) {
  // Verification si l'inviteur a le droit d'ajouter (owner / admin)
  const inviterMembership = await db.query.workspaceMember.findFirst({
    where: and(
      eq(workspaceMember.workspaceId, workspaceId),
      eq(workspaceMember.userId, invitedId),
    ),
  });

  if (
    !inviterMembership ||
    !ALLOWED_INVITER_ROLE.includes(inviterMembership.role)
  ) {
    throw new AppError(
      "Vous n'avez pas la permission d'ajouter un membre",
      403,
    );
  }

  if (role === "OWNER" && inviterMembership.role !== "OWNER") {
    throw new AppError("Seul le propriétaire peut attribuer le role", 403);
  }

  //Chercher l'utilisateur par mail
  const targetUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!targetUser) {
    throw new AppError("Aucun utilisateur trouvé avec cet email", 404);
  }

  //verifier s'il n'est pas deja membre
  const alreadyMember = await db.query.workspaceMember.findFirst({
    where: and(
      eq(workspaceMember.workspaceId, workspaceId),
      eq(workspaceMember.userId, targetUser.id),
    ),
  });

  if (alreadyMember) {
    throw new AppError("Cet utilisateur est déjà membre du workspace", 409);
  }

  // Ajouter directement comme membre sans verification
  // TODO: envoyer un email d'invitation pour plus tard
  const [newMember] = await db
    .insert(workspaceMember)
    .values({ workspaceId, userId: targetUser.id, role })
    .returning();

  return newMember;
}

// Get members in the workspace
export async function ListMembersServices(workspaceId: string) {
  return db.query.workspaceMember.findMany({
    where: eq(workspaceMember.workspaceId, workspaceId),
    with: {
      user: {
        columns: { id: true, name: true, email: true, image: true },
      },
    },
    orderBy: (wm, { asc }) => [asc(wm.createdAt)],
  });
}

async function countOwners(workspaceId: string) {
  const owners = await db.query.workspaceMember.findMany({
    where: and(
      eq(workspaceMember.workspaceId, workspaceId),
      eq(workspaceMember.role, "OWNER"),
    ),
  });
  return owners.length;
}

// mettre a jour les role des membres
export async function updateMemberRoleService(
  workspaceId: string,
  actorId: string,
  targetMemberId: string, // id de la ligne workspaceMember, pas userId
  newRole: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER",
  actorRole: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER",
) {
  const target = await db.query.workspaceMember.findFirst({
    where: and(
      eq(workspaceMember.id, targetMemberId),
      eq(workspaceMember.workspaceId, workspaceId),
    ),
  });

  if (!target) {
    throw new AppError("Membre introuvable", 404);
  }

  // Interdit de s'auto-modifier via cette route
  if (target.userId === actorId) {
    throw new AppError("Vous ne pouvez pas modifier votre propre rôle", 403);
  }

  // Seul un OWNER peut promouvoir quelqu'un OWNER
  if (newRole === "OWNER" && actorRole !== "OWNER") {
    throw new AppError(
      "Seul le propriétaire peut attribuer le rôle OWNER",
      403,
    );
  }

  // Empêcher de rétrograder le dernier OWNER
  if (target.role === "OWNER" && newRole !== "OWNER") {
    const ownersCount = await countOwners(workspaceId);
    if (ownersCount <= 1) {
      throw new AppError(
        "Impossible de rétrograder le dernier propriétaire. Transférez d'abord la propriété.",
        409,
      );
    }
  }

  const [updated] = await db
    .update(workspaceMember)
    .set({ role: newRole })
    .where(eq(workspaceMember.id, targetMemberId))
    .returning();

  return updated;
}

// Effacer un Membres
export async function removeMembersServices(
  workspaceId: string,
  actorId: string,
  memberIds: string[],
) {
  const targets = await db.query.workspaceMember.findMany({
    where: and(
      inArray(workspaceMember.id, memberIds),
      eq(workspaceMember.workspaceId, workspaceId),
    ),
  });

  if (targets.length === 0) {
    throw new AppError("Aucun membre trouvé", 404);
  }

  // Interdit de s'auto-retirer via cette route
  if (targets.some((m) => m.userId === actorId)) {
    throw new AppError("Vous ne pouvez pas vous retirer vous-même", 403);
  }

  // Vérifie qu'on ne supprime pas tous les OWNER restants
  const ownersInSelection = targets.filter((m) => m.role === "OWNER").length;
  if (ownersInSelection > 0) {
    const totalOwners = await countOwners(workspaceId);
    if (totalOwners - ownersInSelection < 1) {
      throw new AppError(
        "Impossible de rétrograder le dernier propriétaire. Transférez d'abord la propriété.",
        409,
      );
    }
  }

  await db
    .delete(workspaceMember)
    .where(
      and(
        inArray(workspaceMember.id, memberIds),
        eq(workspaceMember.workspaceId, workspaceId),
      ),
    );

  return { removedCount: targets.length };
}
