import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type AppStore = {
  sidebarOpen: boolean;
  theme: Theme;
  workspaceId: string | null;

  setWorkspaceId: (workspaceId: string) => void;
  clearWorkspaceId: () => void;

  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: Theme) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: "system",
      workspaceId: null,

      setWorkspaceId: (workspaceId) => {
        set({ workspaceId });
      },

      clearWorkspaceId: () => {
        set({ workspaceId: null });
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      toggleSidebar: () => {
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        }));
      },

      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: "app-storage",
    },
  ),
);
