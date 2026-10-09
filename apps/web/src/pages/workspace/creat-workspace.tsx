import { useNavigate } from "react-router";
import WorkspaceForm from "../../components/workspaces/workspace-form";
import Button from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useWorkspaces } from "../../queries/workspace.queries";

const CreateWorkspacePage = () => {
  const navigate = useNavigate();

  const { data: workspaces = [], isPending, isError } = useWorkspaces();

  const handleBack = () => {
    if (workspaces.length > 0) {
      navigate("/dashboard");
      return;
    }
    navigate("/workspace/empty");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={isPending || isError}
          className="mt-4 absolute top-32 text-center text-sm text-muted-foreground ">
          <ArrowLeft className="size-4" />
          <span>{isPending ? "Chargement..." : "Retour"}</span>
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Créer un workspace
          </h1>

          <p className="mt-2 text-muted-foreground">
            Créez un workspace pour commencer à gérer vos finances.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <WorkspaceForm />
        </div>
      </div>
    </main>
  );
};

export default CreateWorkspacePage;
