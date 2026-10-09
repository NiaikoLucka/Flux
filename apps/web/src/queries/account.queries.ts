import { useQuery,  } from "@tanstack/react-query";

import { getAccounts } from "../services/Accounts.service";

export const accountsKeys = {
  all: ["accounts"] as const,

  list: (workspaceId: string) =>
    [...accountsKeys.all, "list", workspaceId] as const,
};

export const useAccount = (workspaceId: string | null) => {

    console.log("use Account",workspaceId);
    

  return useQuery({
    queryKey: workspaceId ? accountsKeys.list(workspaceId) : accountsKeys.all,
    queryFn: () => {
      if (!workspaceId) {
        throw new Error("Workspace ID manquant");
      }

      return getAccounts(workspaceId);
    },
    enabled: !!workspaceId,
  });
};
