import { useState } from "react";
import { LogOut } from "lucide-react";

import { useSession } from "../../../hooks/use-session";
import { useNavigate } from "react-router";
import { authService } from "../../../services/auth.service";
import { queryClient } from "../../../lib/query-client";
import { workspaceKeys } from "../../../queries/workspace.queries";

const UserMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  const userName = session?.user.name ?? "User";
  const initial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      console.log("Logout...");

      const result = await authService.signOut();

      queryClient.removeQueries({ queryKey: workspaceKeys.all });
      console.log("Résultat:", result);

      if (result.error) {
        console.error("Erreur logout:", result.error);
        return;
      }

      console.log("Navigation login");

      setOpen(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Exception logout:", err);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
        aria-label="Menu utilisateur"
        aria-expanded={open}>
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-56 rounded-lg border border-border bg-background p-2 shadow-lg">
          <div className="border-b border-border px-3 py-2">
            <p className="text-sm font-medium">{userName}</p>

            <p className="truncate text-xs text-muted-foreground">
              {session?.user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
            <LogOut className="size-4" />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
