import { Navigate, Outlet } from "react-router";
import { useWorkspaces } from "../queries/workspace.queries";



const WorkspaceGate = () => {
  const { data: workspace, isFetching, isPending, isError,error } = useWorkspaces();

    console.log("=== WorkspaceGate ===");
  console.log("workspaces:", workspace);
  console.log("isPending:", isPending);
  console.log("isFetching:", isFetching);
  console.log("isError:", isError);
  console.log("error:", error);
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
    console.log("➡️ REDIRECTION EMPTY");
    return <Navigate to="/workspace/empty" replace />;
  }

  console.log("➡️ ACCÈS DASHBOARD");

  return <Outlet/>
};

export default WorkspaceGate;
