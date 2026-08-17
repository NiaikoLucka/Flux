import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

import { useAppStore } from "../../stores/app.store";

const ThemeToggle = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="rounded-md p-2 hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
};

export default ThemeToggle;