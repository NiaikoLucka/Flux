import {
  ArrowLeftRight,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { NavLink } from "react-router";
import { useAppStore } from "../../stores/app.store";
import clsx from "clsx";

interface SidebarProps {
  onSettingsClick: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Accounts",
    href: "/accounts",
    icon: Wallet,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Workspace",
    href: "/workspace",
    icon: Users,
  },
];

const Sidebar = ({ onSettingsClick }: SidebarProps) => {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}
      {/* TODO: ajouter un side bar au mobil */}
      <aside
        className={clsx(
          [
            "fixed inset-y-0 left-0 z-40 hidden w-64 border-border border-r bg-sidebar transition-transform duration-200 md:block md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" "),
        )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center  px-6">
            <span className="text-lg font-semibold">Flux</span>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-2 hover:bg-sidebar-accent md:hidden"
              aria-label="Close sidebar">
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    ].join(" ")
                  }>
                  <Icon className="size-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="border-t border-border p-4">
            <div
              onClick={onSettingsClick}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 cursor-pointer">
              <Settings className="size-4" />
              Paramètres
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
