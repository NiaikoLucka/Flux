import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createWorkspace, getWorkspaces } from "../services/workspace.service";
import { useSession } from "../hooks/use-session";
import type { Workspace } from "../types/workspace.types";

export const workspaceKeys = {
  all: ["workspaces"] as const,
  list: (userId: string) => [...workspaceKeys.all, "list", userId] as const,
};

export const useWorkspaces = () => {
  const { data: session, isPending: sessionPending } = useSession();

  const userId = session?.user?.id;

  return useQuery({
    queryKey: workspaceKeys.list(userId ?? ""),
    queryFn: getWorkspaces,
    enabled: !sessionPending && !!userId,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,

    onSuccess: (newWorkspace) => {
      queryClient.setQueriesData(
        { queryKey: workspaceKeys.all },
        (old: Workspace[] | undefined) => (old ? [...old, newWorkspace] : old),
      );
    },
  });
};
