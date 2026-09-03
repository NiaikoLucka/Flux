import { Link } from "react-router";
import WorkspaceForm from "../../components/workspaces/workspace-form";
import Button from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateWorkspacePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <Link
          to="/workspaces/empty"
          className="text-sm text-muted-foreground  flex items-center gap-2">
          <Button variant="ghost" className="mt-4 absolute top-32 text-center">
            <ArrowLeft className="size-4" />
            <span>Retour</span>
          </Button>
        </Link>

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
