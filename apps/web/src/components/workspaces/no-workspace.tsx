import { Link } from "react-router";
import Header from "../shared/header";

const NoWorkspacePage = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold">Bienvenue</h1>

          <p className="mt-3 text-muted-foreground">
            Vous ne faites actuellement partie d'aucun workspace.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/workspace/create">
              <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                Créer un workspace
              </button>
            </Link>

            <button className="rounded-md border px-4 py-2">
              Voir mes invitations
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NoWorkspacePage;
