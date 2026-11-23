import { Bell } from "lucide-react";
import UserMenu from "./headerComponents/userMenu";
import { useSession } from "../../hooks/use-session";
import { useWorkspaces } from "../../queries/workspace.queries";
import { useAppStore } from "../../stores/app.store";

const Header = () => {
  const { data: session } = useSession();
  const { data: workspaces = [], isPending } = useWorkspaces();

  const userId = session?.user.id;
  const workspaceId = useAppStore((state) =>
    userId ? state.selectedWorkspaceByUser[userId] : null,
  );

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId,
  );
  if (isPending) {
    return <p>Chargement...</p>;
  }
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">
          {"Workspace active : " + activeWorkspace?.name}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-accent"
          aria-label="Notifications">
          <Bell className="size-5" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;