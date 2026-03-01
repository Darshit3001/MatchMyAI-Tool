"use client";

import { useFilterStore, type FeedTab } from "@/stores/filterStore";
import { TrendingUp, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const tabs: { id: FeedTab; label: string; icon: React.ElementType }[] = [
    { id: "latest", label: "Latest", icon: Clock },
    { id: "foryou", label: "For You", icon: Sparkles },
    { id: "trending", label: "Trending", icon: TrendingUp },
];

export function FeedTabs() {
    const { feedTab, setFeedTab } = useFilterStore();

    return (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] w-fit">
            {tabs.map((tab) => {
                const isActive = feedTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setFeedTab(tab.id)}
                        className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                                ? "text-[var(--text-primary)]"
                                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                            }`}
                        id={`feed-tab-${tab.id}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="feedTabBg"
                                className="absolute inset-0 bg-[var(--color-primary)]/15 rounded-lg border border-[var(--color-primary)]/30"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                        )}
                        <tab.icon size={14} className="relative z-10" />
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
