import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { workspaceMember } from "../../db/schema/workspace.schema.js";
import { AppError } from "../../errors/AppError.js";
import { user } from "../../db/schema/auth.schema.js";

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
