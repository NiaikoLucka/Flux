import { Outlet } from "react-router";

import Sidebar from "../components/shared/sidebar";
import Header from "../components/shared/header";
import { useState } from "react";
import SettingsPage from "../pages/settings/settings";

const DashboardLayout = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar onSettingsClick={() => setSettingsOpen(true)} />
      <SettingsPage
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <div className="min-h-screen md:pl-64">
        <Header />

        <main className="p-6 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
