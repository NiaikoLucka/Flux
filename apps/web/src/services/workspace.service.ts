import { api } from "../lib/axios";

import type { Workspace, CreateWorkspaceInput } from "../types/workspace.types";

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const response = await api.get("/workspaces");

  return response.data;
};

export const createWorkspace = async (
  data: CreateWorkspaceInput,
): Promise<CreateWorkspaceInput> => {
  const response = await api.post("/workspaces", data);

  return response.data;
};
