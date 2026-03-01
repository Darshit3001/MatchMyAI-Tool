import { create } from "zustand";

interface UIState {
    sidebarCollapsed: boolean;
    searchOpen: boolean;
    theme: "dark" | "light";
    toggleSidebar: () => void;
    setSearchOpen: (open: boolean) => void;
    toggleSearch: () => void;
    setTheme: (theme: "dark" | "light") => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarCollapsed: false,
    searchOpen: false,
    theme: "dark",
    toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setSearchOpen: (open) => set({ searchOpen: open }),
    toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
    setTheme: (theme) => set({ theme }),
}));
