import {
  ArrowLeftRight,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router";

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

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-border border-r bg-sidebar md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center  px-6">
          <span className="text-lg font-semibold">Flux</span>
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
          <NavLink
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200">
            <Settings className="size-4" />
            Settings
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
