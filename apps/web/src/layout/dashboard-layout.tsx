import { Outlet } from "react-router";

import Sidebar from "../components/shared/sidebar";
import Header from "../components/shared/header";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="min-h-screen md:pl-64">
        <Header />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
