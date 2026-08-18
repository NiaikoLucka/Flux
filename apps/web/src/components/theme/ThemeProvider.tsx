import { useEffect } from "react";

import { useAppStore } from "../../stores/app.store";

const ThemeProvider = () => {
  const theme = useAppStore((state) => state.theme);

console.log("theme provider:" , theme);

  useEffect(() => {
    const root = document.documentElement;

    // Thème clair
    if (theme === "light") {
      root.classList.remove("dark");
      return;
    }

    // Thème sombre
    if (theme === "dark") {
      root.classList.add("dark");
      return;
    }

    // Thème système
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const applySystemTheme = () => {
      root.classList.toggle("dark", mediaQuery.matches);
    };

    // Appliquer le thème système immédiatement
    applySystemTheme();

    // Écouter les changements du thème système
    mediaQuery.addEventListener("change", applySystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", applySystemTheme);
    };
  }, [theme]);

  return null;
};

export default ThemeProvider;