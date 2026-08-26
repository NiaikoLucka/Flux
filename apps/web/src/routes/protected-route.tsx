import { Navigate, Outlet, useLocation } from "react-router";
import { useSession } from "../hooks/use-session";

const ProtectedRoute = () => {
  const { data: session, isPending } = useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-lg text-muted-foreground "> Chargement ...</p>
      </div>
    );
  }

  if(!session){
    return(
        <Navigate to="/login" replace state={{ from: location }}/>
    )
  }

  return <Outlet />;
};

export default ProtectedRoute;
