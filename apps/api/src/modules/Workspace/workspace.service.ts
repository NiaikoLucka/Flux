import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { workspace, workspaceMember } from "../../db/schema/index.js";
import { User } from "../../types/auth.types.js";
import { creatWorkspace, Workspace } from "../../types/workspace.types.js";

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
