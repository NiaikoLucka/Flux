import { api } from "../lib/axios";
import type {
  FinancialAccount,
//   CreateAccountInput,
} from "../types/account.types";

export const getAccounts = async (
  workspaceId: string,
): Promise<FinancialAccount[]> => {
  console.log("from services : ",workspaceId);
  
  const response = await api.get(
    `/workspaces/${workspaceId}/financial_accounts`,
  );

  console.log(response);
  

  return response.data
};
