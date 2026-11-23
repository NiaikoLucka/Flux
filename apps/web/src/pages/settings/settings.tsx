import ThemeSelector from "../../components/settings/ThemeSelector";

const SettingsPage = () => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <section className="space-y-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Paramètres</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Gérez votre compte et votre espace de travail.
          </p>
        </div>

        {/* TODO: gerer le settings */}
        <div>
          <h2 className="text-lg font-semibold">Apparence</h2>

          <p className="text-sm text-muted-foreground">
            Personnalisez l'apparence de l'application.
          </p>
        </div>

        <div className="flex items-center justify-between  border-t border-border p-4">
          <div>
            <h3 className="text-sm font-medium">Thème</h3>

            <p className="text-sm text-muted-foreground">
              Choisissez le thème de l'application.
            </p>
          </div>

          <ThemeSelector />
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
