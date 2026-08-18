import {
  ArrowLeftRight,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Users,
  Wallet,
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
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 border-r border-border bg-background transition-[width] duration-200 ",
        sidebarOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex h-full flex-col">

        {/* Header */}
        <div
          className={clsx(
            "flex h-16 items-center border-b border-border",
            sidebarOpen
              ? "justify-between px-4"
              : "justify-center",
          )}
        >
          {sidebarOpen && (
            <span className="text-lg font-semibold">
              Flux
            </span>
          )}

          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-md p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
            aria-label={
              sidebarOpen
                ? "Réduire le menu"
                : "Développer le menu"
            }
          >
            <PanelLeft
              className={clsx(
                "size-4 transition-transform duration-200",
                !sidebarOpen && "rotate-180",
              )}
            />
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
                title={!sidebarOpen ? item.label : undefined}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center rounded-md py-2 text-sm font-medium transition-colors duration-200",
                    sidebarOpen
                      ? "gap-3 px-3"
                      : "justify-center px-2",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )
                }
              >
                <Icon className="size-4 shrink-0" />

                {sidebarOpen && (
                  <span>{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={onSettingsClick}
            title={!sidebarOpen ? "Paramètres" : undefined}
            className={clsx(
              "flex w-full items-center rounded-md py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              sidebarOpen
                ? "gap-3 px-3"
                : "justify-center px-2",
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Settings className="size-4 shrink-0" />

            {sidebarOpen && (
              <span>Paramètres</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;