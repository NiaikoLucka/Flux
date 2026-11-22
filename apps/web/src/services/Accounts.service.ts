import { api } from "../lib/axios";
import type {
  FinancialAccount,
  CreateAccountInput,
} from "../types/account.types";

export const getAccounts = async (
  workspaceId: string,
): Promise<FinancialAccount[]> => {
  console.log("from services : ", workspaceId);

  const response = await api.get(
    `/workspaces/${workspaceId}/financial_accounts`,
  );

  console.log(response);

  return response.data;
};

export const creatAccount = async (
  workspaceId: string,
  data: CreateAccountInput,
): Promise<FinancialAccount> => {
  const response = await api.post(
    `/workspaces/${workspaceId}/financial_accounts`,
    data,
  );

  return response.data;
};

export const updateAccount = async (
  workspaceId: string,
  accountId: string,
  data: CreateAccountInput,
) :Promise <FinancialAccount> =>{ 
  const response = await api.patch(
    `/workspaces/${workspaceId}/financial_accounts/${accountId}`,
    data,
  );
  return response.data;
}

export const deleteAccount = async (
  workspaceId: string,
  accountId: string,
): Promise<void> => {
  await api.delete(
    `/workspaces/${workspaceId}/financial_accounts/${accountId}`,
  );
};