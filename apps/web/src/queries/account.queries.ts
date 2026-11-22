import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  creatAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from "../services/Accounts.service";
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
    mutationFn: (data: CreateAccountInput) => {
      if (!workspaceId) {
        throw new Error("Workspace ID manquant");
      }
      return creatAccount(workspaceId, data);
    },

    onSuccess: () => {
      if (workspaceId) {
        queryClient.invalidateQueries({
          queryKey: accountsKeys.list(workspaceId),
        });
      }
    },
  });
};

export const useUpdateAccount = (workspaceId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
      data,
    }: {
      accountId: string;
      data: CreateAccountInput;
    }) => {
      if (!workspaceId) {
        throw new Error("Workspace ID manquant");
      }
      return updateAccount(workspaceId, accountId, data);
    },

    onSuccess: async () => {
      if (workspaceId) {
        await queryClient.invalidateQueries({
          queryKey: accountsKeys.list(workspaceId),
        });
      }
    },
  });
};

export const useDeleteAccount = (workspaceId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => {
      if (!workspaceId) {
        throw new Error("Workspace ID manquant");
      }

      return deleteAccount(workspaceId, accountId);
    },

    onSuccess: async () => {
      if (workspaceId) {
        await queryClient.invalidateQueries({
          queryKey: accountsKeys.list(workspaceId),
        });
      }
    },
  });
};
