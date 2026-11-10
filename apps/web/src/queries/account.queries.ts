import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { creatAccount, getAccounts } from "../services/Accounts.service";
import type { CreateAccountInput } from "../types/account.types";

export const accountsKeys = {
  all: ["accounts"] as const,

  list: (workspaceId: string) =>
    [...accountsKeys.all, "list", workspaceId] as const,
};

export const useAccount = (workspaceId: string | null) => {
  console.log("use Account", workspaceId);

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

export const useCreateAccount = (workspaceId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data : CreateAccountInput) => {
      if(!workspaceId){
        throw new Error("Workspace ID manquant")
      }
      return creatAccount(workspaceId, data)
    },

    onSuccess: ()=>{
      if (workspaceId){
        queryClient.invalidateQueries({
          queryKey: accountsKeys.list(workspaceId)
        })
      }
    }
  })
}