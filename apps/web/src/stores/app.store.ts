import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type AppStore = {
  sidebarOpen: boolean;
  theme: Theme;
  selectedWorkspaceByUser: Record<string, string | null>;
  workspaceId: string | null;

  setWorkspaceId: (userId: string, workspaceId: string) => void;
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
      selectedWorkspaceByUser: {},
      workspaceId: null,

      setWorkspaceId: (userId, workspaceId) => {
        set((state) => ({
          selectedWorkspaceByUser: {
            ...state.selectedWorkspaceByUser,
            [userId]: workspaceId,
          },
        }));
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
