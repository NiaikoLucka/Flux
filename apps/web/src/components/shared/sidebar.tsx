import {
  ArrowLeftRight,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router";
import { useAppStore } from "../../stores/app.store";
import clsx from "clsx";


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
];

const Sidebar = () => {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 border-r border-border bg-background transition-[width] duration-200 ",
        sidebarOpen ? "w-64" : "w-16",
      )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div
          className={clsx(
            "flex h-16 items-center border-b border-border",
            sidebarOpen ? "justify-between px-4" : "justify-center",
          )}>
          {sidebarOpen && <span className="text-lg font-semibold">Flux</span>}

          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-md p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
            aria-label={sidebarOpen ? "Réduire le menu" : "Développer le menu"}>
            <PanelLeft
              className={clsx(
                "size-4 transition-transform duration-200",
                !sidebarOpen && "rotate-180",
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-2 ">
          <nav className={clsx(sidebarOpen ? "mt-6" : "mt-0")}>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  title={!sidebarOpen ? item.label : undefined}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center rounded-md py-2 text-sm font-medium transition-colors duration-200 mb-1",
                      sidebarOpen ? "gap-3 px-3" : "justify-center px-2",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )
                  }>
                  <Icon className="size-4 shrink-0" />

                  {sidebarOpen && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Settings */}
        <div className="border-t border-border p-4">
          <NavLink
            key={"/settings"}
            to={"/settings"}
            type="button"
            title={!sidebarOpen ? "Paramètres" : undefined}
            className={clsx(
              "flex w-full items-center rounded-md py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              sidebarOpen ? "gap-3 px-3" : "justify-center px-2",
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}>
            <Settings className="size-4 shrink-0" />

            {sidebarOpen && <span>Paramètres</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
