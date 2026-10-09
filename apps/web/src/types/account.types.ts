export type AccountType = "BANK" | "CASH" | "MOBILE_MONEY";

export type FinancialAccount = {
  id: string;
  workspaceId: string;
  name: string;
  type: AccountType;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateAccountInput = {
  name: string;
  type: AccountType;
};
