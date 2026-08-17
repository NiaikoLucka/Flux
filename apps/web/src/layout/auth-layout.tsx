import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Outlet />
    </main>
  );
};

export default AuthLayout;