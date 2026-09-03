import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useWorkspaces } from "../../queries/workspace.queries";
import { useAppStore } from "../../stores/app.store";
import Button from "../ui/button";
import { useNavigate } from "react-router";
import { useSession } from "../../hooks/use-session";
import clsx from "clsx";

type WorkspaceProps = {
  className?: string;
};

const WorkspaceSwitcher = ({ className }: WorkspaceProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: session } = useSession();
  const { data: workspaces = [], isPending } = useWorkspaces();

  const userId = session?.user.id;
  const worksapceId = useAppStore((state) =>
    userId ? state.selectedWorkspaceByUser[userId] : null,
  );
  const setWorkspaceId = useAppStore((state) => state.setWorkspaceId);
  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === worksapceId,
  );

  console.log("workspace:", workspaces);
  console.log("workspaceId: ", worksapceId);

  console.log("active workspace:", activeWorkspace);

  if (isPending) {
    return <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />;
  }

  const handleSelectWorkspace = (id: string) => {
    if (!userId) return;
    setWorkspaceId(userId, id);
    setOpen(false);
  };

  const handleCreateWorkspace = () => {
    setOpen(false);
    navigate("/workspace/create");
  };
  return (
    <div className={clsx("relative", className)}>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen((value) => !value)}
        className="w-full flex justify-between!"
        >
        {/* <CurrentIcon className="size-4" /> */}

        <span>{activeWorkspace?.name || "Selectionner un workspace"}</span>
        <ChevronDown
          className={`size-4 transition-transform
            ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
          {workspaces.map((workspace) => (
            <Button
              className="w-full flex justify-between!"
              variant="ghost"
              onClick={() => handleSelectWorkspace(workspace.id)}>
              <span>{workspace.name}</span>
              {workspace.id === worksapceId && <Check className="size-4" />}
            </Button>
          ))}
          <div className="my-1 h-px bg-border" />

          <Button
            variant="ghost"
            onClick={handleCreateWorkspace}
            className="w-full">
            <Plus className="size-4" aria-hidden="true" />
            Créer un workspace
          </Button>
        </div>
      )}
    </div>
  );
};
export default WorkspaceSwitcher;
