import ThemeToggle from "../../components/shared/theme-toggle";
import Modal from "../../components/ui/modal";

interface SettingsPageProps {
  open: boolean;
  onClose: () => void;
}

const SettingsPage = ({ open, onClose }: SettingsPageProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Paramètres">
      <p className="text-accent-foreground">Paramètres de l'application.</p>

      {/* Todo cree l'affichage du settings */}

      <ThemeToggle/>
    </Modal>
  );
};

export default SettingsPage;
