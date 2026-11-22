import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createAccountSchema,
  type CreateAccountForm,
} from "../../schema/account.schema";
import type { FinancialAccount } from "../../types/account.types";
import {
  useCreateAccount,
  useUpdateAccount,
} from "../../queries/account.queries";
import Input from "../ui/input";
import Button from "../ui/button";

type AccountFormProps = {
  workspaceId: string;
  account?: FinancialAccount;
  onSuccess: () => void;
};

const AccountForm = ({ workspaceId, account, onSuccess }: AccountFormProps) => {
  const isEditing = Boolean(account);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: account?.name ?? "",
      type: account?.type ?? "BANK",
      initialBalance: account ? Number(account.initialBalance) : 0,
    },
  });

  const creatMutation = useCreateAccount(workspaceId);
  const updateMutation = useUpdateAccount(workspaceId);

  const isPending = creatMutation.isPending || updateMutation.isPending;

  const error = creatMutation.error ?? updateMutation.error;

  const onSubmit = async (data: CreateAccountForm) => {
    try {
      if (account) {
        await updateMutation.mutateAsync({
          accountId: account.id,
          data,
        });
      } else {
        await creatMutation.mutateAsync(data);
      }
      reset();
      onSuccess();
    } catch {
      //Le message est afficher sous le formulaire
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Nom du Compnte</label>
        <Input
          id="name"
          placeholder="ex. Compte banquaire"
          {...register("name")}
          error={errors.name?.message}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Type de compte
        </label>

        <select
          id="type"
          {...register("type")}
          disabled={isPending}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
          <option value="CASH" >Espèces</option>
          <option value="BANK">Compte bancaire</option>
          <option value="MOBILE_MONEY">Mobile Money</option>
        </select>

        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="initialBalance" className="text-sm font-medium">
          Solde initial
        </label>

        <Input
          id="initialBalance"
          type="number"
          step="0.01"
          min="0"
          {...register("initialBalance", { valueAsNumber: true })}
          error={errors.initialBalance?.message}
          disabled={isPending}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">
          Impossible de créer le compte. Vérifiez vos droits et réessayez.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? isEditing
            ? "Modification..."
            : "Création..."
          : isEditing
            ? "Enregistrer les modifications"
            : "Créer le compte"}
      </Button>
    </form>
  );
};

export default AccountForm;
