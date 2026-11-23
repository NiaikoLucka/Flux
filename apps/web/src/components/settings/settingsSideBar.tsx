import clsx from "clsx";
import { NavLink } from "react-router";

const settingsLinks = [
  {
    label: "compte",
    path: "/settings/account",
  },
  {
    label: "Workspaces",
    path: "/settings/workspace",
  },
  {
    label: "Members",
    path: "/settings/members",
  },
  {
    label: "Apparence",
    path: "/settings/appearance",
  },
];

const SettingsSideBar = () => {
  return (
    <aside className="w-60 shrink-0">
      <nav className="space-y-1">
        {settingsLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }>
                <span>{link.label}</span>
            </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSideBar;
