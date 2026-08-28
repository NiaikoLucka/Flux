import { Link } from "react-router";
import WorkspaceForm from "../../components/workspaces/workspace-form";

const CreateWorkspacePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Créer un workspace
          </h1>

          <p className="mt-2 text-muted-foreground">
            Créez un workspace pour commencer à gérer vos finances.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <WorkspaceForm />
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/workspaces/empty"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Retour
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CreateWorkspacePage;