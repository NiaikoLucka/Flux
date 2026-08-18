import ThemeSelector from "../../components/settings/ThemeSelector";
import Modal from "../../components/ui/modal";

interface SettingsPageProps {
  open: boolean;
  onClose: () => void;
}

const SettingsPage = ({ open, onClose }: SettingsPageProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Paramètres">
      <section className="space-y-4">
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
    </Modal>
  );
};

export default SettingsPage;
