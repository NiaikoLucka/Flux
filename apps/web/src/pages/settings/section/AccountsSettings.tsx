import { useState, type FormEvent } from "react";
import SettingsCard from "../../../components/settings/sittingsCard";
import { useSession } from "../../../hooks/use-session";
import { authClient } from "../../../lib/auth-client";
import Button from "../../../components/ui/button";
import { Pencil } from "lucide-react";
import Modal from "../../../components/ui/modal";
import Input from "../../../components/ui/input";

const AccountsSettings = () => {
  const { data: session, isPending } = useSession();

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(true);

  const [isSavingName, setIsSavingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (isPending) {
    return <p>Chargement ...</p>;
  }

  if (!session) {
    return <p>Vous devez être connecté.</p>;
  }

  const openNameEdition = () => {
    setName(session.user.name);
    setProfileError("");
    setSuccessMessage("");
    setIsEditingName(true);
  };

  const handleUpdateName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      setProfileError("Le nom doit contenir au moins 2 caractères.");
      return;
    }

    setProfileError("");
    setSuccessMessage("");
    setIsSavingName(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setProfileError(
          result.error.message ?? "Impossible de modifier le nom.",
        );
        return;
      }

      setSuccessMessage("Votre nom a été mis à jour.");
      setIsEditingName(false);
    } finally {
      setIsSavingName(false);
    }
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentPassword) {
      setPasswordError("Saisissez votre mot de passe actuel.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "Le nouveau mot de passe doit contenir au moins 8 caractères.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les deux nouveaux mots de passe sont différents.");
      return;
    }

    setPasswordError("");
    setSuccessMessage("");
    setIsChangingPassword(true);

    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions,
      });

      if (result.error) {
        setPasswordError(
          result.error.message ?? "Impossible de modifier le mot de passe.",
        );
        return;
      }

      closePasswordModal();
      setSuccessMessage("Votre mot de passe a été modifié.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Mon Compte</h2>

        <p className="text-sm text-muted-foreground">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>

      {successMessage && (
        <p className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
          {successMessage}
        </p>
      )}

      <SettingsCard
        title="Informations personnelles"
        description="Modifiez les informations associées à votre compte.">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex-row">
              <p className="text-sm font-medium">Nom complet</p>
              <span className="text-sm text-muted-foreground">
                Le Nom associées a votre compte
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {session?.user.name}
              </span>
              <Button type="button" variant="ghost" onClick={openNameEdition}>
                <Pencil className="size-4 text-muted-foreground" />
              </Button>
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
              <span className="text-sm text-muted-foreground">
                L'addresse e-mail associées a votre compte
              </span>
            </div>
            <div className="flex-col ">
              <span className="text-sm text-muted-foreground">
                {session?.user.email}
              </span>
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
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setPasswordError("");
              setSuccessMessage("");
              setIsPasswordModalOpen(true);
            }}>
            Modifier
          </Button>
        </div>
      </SettingsCard>

      <Modal
        open={isEditingName}
        onClose={() => setIsEditingName(false)}
        title="Modifier mon nom">
        <form onSubmit={handleUpdateName} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom complet
            </label>

            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSavingName}
            />

            {profileError && (
              <p className="text-sm text-destructive">{profileError}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditingName(false)}
              disabled={isSavingName}>
              Annuler
            </Button>

            <Button type="submit" disabled={isSavingName}>
              {isSavingName ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={isPasswordModalOpen}
        onClose={closePasswordModal}
        title="Modifier le mot de passe">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Mot de passe actuel
            </label>

            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              disabled={isChangingPassword}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              Nouveau mot de passe
            </label>

            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              disabled={isChangingPassword}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmer le nouveau mot de passe
            </label>

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={isChangingPassword}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={revokeOtherSessions}
              onChange={(event) => setRevokeOtherSessions(event.target.checked)}
              disabled={isChangingPassword}
            />
            Déconnecter mes autres appareils
          </label>

          {passwordError && (
            <p className="text-sm text-destructive">{passwordError}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={closePasswordModal}
              disabled={isChangingPassword}>
              Annuler
            </Button>

            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword
                ? "Modification..."
                : "Modifier le mot de passe"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default AccountsSettings;
