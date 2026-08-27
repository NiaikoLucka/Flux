export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
export type CreateWorkspaceInput = {
  name: string;
};
