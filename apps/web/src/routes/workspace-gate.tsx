import { Navigate, Outlet } from "react-router";
import { useWorkspaces } from "../queries/workspace.queries";



const WorkspaceGate = () => {
  const { data: workspace, isPending, isError } = useWorkspaces();

  if(isPending || !workspace){
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <p>Chargement...</p>
        </div>
    )
  }

  if (isError){
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Impossible de charger vos workspaces.</p>
      </div>
    );
  }

  if (!workspace || workspace.length === 0) {
    return <Navigate to="/workspace/empty" replace />;
  }


  return <Outlet/>
};

export default WorkspaceGate;
