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
