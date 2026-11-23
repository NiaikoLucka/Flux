
import ThemeSelector from "../../../components/settings/ThemeSelector";

const AppearanceSettings = () => {
  return (
    <section>
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
  );
};

export default AppearanceSettings;
