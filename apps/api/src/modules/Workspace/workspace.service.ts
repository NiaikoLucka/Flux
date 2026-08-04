import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { user, workspace, workspaceMember } from "../../db/schema/index.js";
import { User } from "../../types/auth.types.js";
import { creatWorkspace, Workspace } from "../../types/workspace.types.js";
import { AppError } from "../../errors/AppError.js";

const ALLOWED_INVITER_ROLE = ["OWNER", "ADMIN"];

// Creat a newWork space
export async function createWorkspaceService(
  UserId: string,
  data: creatWorkspace,
) {
  return await db.transaction(async (tx) => {
    const [newWorkspace] = await tx
      .insert(workspace)
      .values({
        name: data.name,
        currency: data.currency ?? "MGA",
        createdBy: UserId,
      })
      .returning();
    await tx.insert(workspaceMember).values({
      workspaceId: newWorkspace.id,
      userId: UserId,
      role: "OWNER",
    });
    return newWorkspace;
  });
}
//Get User Workspace
export async function getUserWorkspace(UserId: string) {
  const rows = db
    .select({
      id: workspace.id,
      name: workspace.name,
      currency: workspace.currency,
      createdBy: workspace.createdBy,
      createdAt: workspace.createdAt,
      role: workspaceMember.role,
    })
    .from(workspaceMember)
    .innerJoin(workspace, eq(workspaceMember.workspaceId, workspace.id))
    .where(eq(workspaceMember.userId, UserId));

  return rows;
}

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
