import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";

import { useAppStore } from "../../stores/app.store";
import Button from "../ui/button";

const themes = [
  {
    value: "system",
    label: "Système",
    icon: Monitor,
  },
  {
    value: "light",
    label: "Clair",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Sombre",
    icon: Moon,
  },
] as const;

const ThemeSelector = () => {
  const [open, setOpen] = useState(false);

  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  const currentTheme = themes.find((item) => item.value === theme) ?? themes[2];

  // const CurrentIcon = currentTheme.icon;

  const handleThemeChange = (value: (typeof themes)[number]["value"]) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div ref={selectorRef} className="relative">
      {/* Bouton */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}>
        {/* <CurrentIcon className="size-4" /> */}

        <span>{currentTheme.label}</span>

        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute flex-col right-0 z-50 mt-2 w-44 rounded-md border border-border bg-background p-2 gap-2  shadow-md"
          role="menu">
          {themes.map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.value;

            return (
              <div
                key={item.value}
                className="flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer px-2 py-2  mb-1 gap-0.5 hover:bg-accent"
                onClick={() => handleThemeChange(item.value)}
                role="menuitem">
                <Icon className="size-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {isSelected && <Check className="size-4" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
