import { useWorkspaces } from "../../queries/workspace.queries";

const WorkspaceTest = () => {
  const { data: workspaces, isPending, isError, error } = useWorkspaces();

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

      <div>
        <p>Nombre : {workspaces.length}</p>

        {workspaces.map((workspace) => (
          <div key={workspace.id}>{workspace.name}</div>
        ))}
      </div>
      <pre>{JSON.stringify(workspaces, null, 2)}</pre>
    </div>
  );
};

export default WorkspaceTest;
