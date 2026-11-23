import { useState } from "react";
import { Check, ChevronRight, Plus } from "lucide-react";
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
  const workspaceId = useAppStore((state) =>
    userId ? state.selectedWorkspaceByUser[userId] : null,
  );
  const setWorkspaceId = useAppStore((state) => state.setWorkspaceId);
  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId,
  );

  console.log("workspace:", workspaces);
  console.log("workspaceId: ", workspaceId);
  console.log("WorkspaceSwitcher workspaceId:", workspaceId);

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
      <div
        onClick={() => setOpen((value) => !value)}
        className="w-full flex justify-between! items-center cursor-pointer"
        >
        {/* <CurrentIcon className="size-4" /> */}

        <span className="text-sm">Changer de  workspace</span>
        <ChevronRight
          className={`size-4 transition-transform
            ${open ? "rotate-90" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute right-50 top-full z-50 mt-0 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
          {workspaces.map((workspace) => (
            <Button
              className="w-full flex justify-between!"
              variant="ghost"
              onClick={() => handleSelectWorkspace(workspace.id)}>
              <span>{workspace.name}</span>
              {workspace.id === workspaceId && <Check className="size-4" />}
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
