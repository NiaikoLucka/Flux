import SettingsCard from "../../../components/settings/sittingsCard";
import { authClient } from "../../../lib/auth-client";

const AccountsSettings = () => {
  const {data:session , isPending} = authClient.useSession()

  if (isPending){
    return <p>Chargement ...</p>
  }
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Mon Compte</h2>

        <p className="text-sm text-muted-foreground">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>

      <SettingsCard
        title="Informations personnelles"
        description="Modifiez les informations associées à votre compte.">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex-row">
              <p className="text-sm font-medium">Nom complet</p>
              <span className="text-sm text-muted-foreground">Le Nom associées a votre compte</span>
            </div>
            <div className="flex-col ">
                <span className="text-sm text-muted-foreground">{session?.user.name}</span>
            </div>
          </div>

          {/* <input
            type="text"
            placeholder="Votre nom"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          /> */}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex-row">
              <p className="text-sm font-medium">Addresse e-mail</p>
              <span className="text-sm text-muted-foreground">L'addresse e-mail associées a votre compte</span>
            </div>
            <div className="flex-col ">
                <span className="text-sm text-muted-foreground">{session?.user.email}</span>
            </div>
          </div>

          {/* <input
            type="email"
            placeholder="votre@email.com"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          /> */}
        </div>
      </SettingsCard>

      {/* Sécurité */}
      <SettingsCard
        title="Sécurité"
        description="Gérez les autres informations de votre compte">
        <div>
          <p className="text-sm font-medium">Mot de passe</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Modifiez régulièrement votre mot de passe pour protéger votre
            compte.
          </p>
        </div>

        <div className="flex justify-end">
          <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            Modifier le mot de passe
          </button>
        </div>
      </SettingsCard>
    </section>
  );
};

export default AccountsSettings;
