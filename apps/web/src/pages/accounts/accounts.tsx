// import AccountsTest from "./accounts.test";

import { useState } from "react";
import AccountForm from "../../components/accounts/account-form";
import { useSession } from "../../hooks/use-session";
import { useAppStore } from "../../stores/app.store";
import { useAccount, useDeleteAccount } from "../../queries/account.queries";
import Modal from "../../components/ui/modal";
import Button from "../../components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { FinancialAccount } from "../../types/account.types";
import Card from "../../components/ui/card";

const AccountsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [accountToEdit, setAccountToEdit] = useState<FinancialAccount | null>(
    null,
  );

  const [accountToDelete, setAccountToDelete] =
    useState<FinancialAccount | null>(null);

  const { data: session } = useSession();
  const userId = session?.user.id;

  const workspaceId = useAppStore((state) =>
    userId ? state.selectedWorkspaceByUser[userId] : null,
  );

  const { data: accounts = [], isPending, isError } = useAccount(workspaceId);

  const {
    mutateAsync: deleteAccount,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteAccount(workspaceId);

  const handleDelete = async () => {
    if (!accountToDelete) {
      return;
    }

    try {
      await deleteAccount(accountToDelete.id);
      setAccountToDelete(null);
    } catch {
      // deleteError est affichée dans la modale.
    }
  };

  if (!workspaceId) {
    return <p>Sélectionnez un workspace avant de créer un compte.</p>;
  }

  if (isPending) {
    return <p>Chargement des comptes...</p>;
  }

  if (isError) {
    return <p>Impossible de charger les comptes.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Comptes</h1>
          <p className="text-sm text-muted-foreground">
            Gérez les comptes financiers de ce workspace.
          </p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="size-4" />
          Ajouter un compte
        </Button>
      </div>

      {accounts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">
            Aucun compte n’a encore été créé.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{account.name}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {account.type.toLocaleLowerCase()}
                  </p>
                </div>

                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAccountToEdit(account)}
                    aria-label={`Modifier ${account.name}`}>
                    <Pencil className="size-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAccountToDelete(account)}
                    aria-label={`Supprimer ${account.name}`}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-lg font-medium">
                Solde initial :{" "}
                {Number(account.initialBalance).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Ajouter un compte">
        <AccountForm
          workspaceId={workspaceId}
          onSuccess={() => setIsCreateModalOpen(false)}
        />
      </Modal>
      <Modal
        open={Boolean(accountToEdit)}
        onClose={() => setAccountToEdit(null)}
        title="Modifier le compte">
        {accountToEdit && (
          <AccountForm
            key={accountToEdit.id}
            workspaceId={workspaceId}
            account={accountToEdit}
            onSuccess={() => setAccountToEdit(null)}
          />
        )}
      </Modal>

      <Modal
        open={Boolean(accountToDelete)}
        onClose={() => setAccountToDelete(null)}
        title="Supprimer le compte">
        {accountToDelete && (
          <div className="space-y-5">
            <p>
              Voulez-vous vraiment supprimer le compte{" "}
              <strong>{accountToDelete.name}</strong> ?
            </p>

            <p className="text-sm text-muted-foreground">
              Cette action est irréversible.
            </p>

            {deleteError && (
              <p className="text-sm text-destructive">
                Impossible de supprimer ce compte. Il possède peut-être déjà des
                transactions.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAccountToDelete(null)}
                disabled={isDeleting}>
                Annuler
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}>
                {isDeleting ? "Suppression..." : "Supprimer"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default AccountsPage;
