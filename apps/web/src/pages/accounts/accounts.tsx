// import AccountsTest from "./accounts.test";

import { useState } from "react";
import AccountForm from "../../components/accounts/account-form";
import { useSession } from "../../hooks/use-session";
import { useAppStore } from "../../stores/app.store";
import { useAccount } from "../../queries/account.queries";
import Modal from "../../components/ui/modal";
import Button from "../../components/ui/button";
import { Plus } from "lucide-react";

const AccountsPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user.id;

  const workspaceId = useAppStore((state) =>
    userId ? state.selectedWorkspaceByUser[userId] : null,
  );

  const { data: accounts = [], isPending, isError } = useAccount(workspaceId);

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
            <article
              key={account.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="font-semibold">{account.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {account.type}
              </p>
              <p className="mt-4 text-lg font-medium">
                Solde initial : {account.initialBalance}
              </p>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Ajouter un compte"
      >
        <AccountForm
          workspaceId={workspaceId}
          onSuccess={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </section>
  );
};

export default AccountsPage;
