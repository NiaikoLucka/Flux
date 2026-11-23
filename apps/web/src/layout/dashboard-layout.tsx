import { Outlet } from "react-router";

import Sidebar from "../components/shared/sidebar";
import Header from "../components/shared/header";

import { useAppStore } from "../stores/app.store";
import clsx from "clsx";

const DashboardLayout = () => {

  const sidebarOpen = useAppStore(
    (state) => state.sidebarOpen,
  );
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className={clsx(
          "min-h-screen transition-all duration-200",
          sidebarOpen ? "ml-64" : "ml-16",
        )}>
        <Header />

        <main className="p-6 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
