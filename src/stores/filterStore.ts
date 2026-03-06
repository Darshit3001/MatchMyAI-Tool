import { create } from "zustand";

export type SortOption = "latest" | "trending" | "popular" | "rating";
export type PricingFilter = "all" | "free" | "freemium" | "paid";
export type FeedTab = "latest" | "foryou" | "trending";

interface FilterState {
    freeMode: boolean;
    category: string | null;
    pricing: PricingFilter;
    sort: SortOption;
    feedTab: FeedTab;
    searchQuery: string;
    // Timeline: null = show all (NOW), string = "2024", "jan-2026", etc.
    timelineFilter: string | null;
    toggleFreeMode: () => void;
    setCategory: (category: string | null) => void;
    setPricing: (pricing: PricingFilter) => void;
    setSort: (sort: SortOption) => void;
    setFeedTab: (tab: FeedTab) => void;
    setSearchQuery: (query: string) => void;
    setTimelineFilter: (filter: string | null) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    freeMode: false,
    category: null,
    pricing: "all",
    sort: "latest",
    feedTab: "latest",
    searchQuery: "",
    timelineFilter: null,
    toggleFreeMode: () => set((state) => ({ freeMode: !state.freeMode })),
    setCategory: (category) => set({ category }),
    setPricing: (pricing) => set({ pricing }),
    setSort: (sort) => set({ sort }),
    setFeedTab: (tab) => set({ feedTab: tab }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setTimelineFilter: (filter) => set({ timelineFilter: filter }),
    resetFilters: () =>
        set({
            freeMode: false,
            category: null,
            pricing: "all",
            sort: "latest",
            searchQuery: "",
            timelineFilter: null,
        }),
}));
