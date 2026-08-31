
import { useSession } from "../../hooks/use-session";
import { useWorkspaces } from "../../queries/workspace.queries";
import { useAppStore } from "../../stores/app.store";

const WorkspaceTest = () => {
  const { data: workspaces = [], isPending, isError, error } = useWorkspaces();
  const { data: session } = useSession();
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

  if (isError) {
    return (
      <div>
        <p>Erreur lors du chargement</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Workspaces</h1>
      {/* <WorkspaceSwitch/> */}

      {/* <div>
        <p>Nombre : {workspaces.length}</p>


        {workspaces.map((workspace) => (
          <div key={workspace.id}>{workspace.name}</div>
        ))}
      </div> */}
      <div>{activeWorkspace?.name}</div>
    </div>
  );
};

export default WorkspaceTest;
