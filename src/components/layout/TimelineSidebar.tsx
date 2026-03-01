"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const timelineItems = [
    { label: "NOW", id: "now", type: "current" as const },
    { label: "FEB", id: "feb-2026", type: "month" as const },
    { label: "JAN", id: "jan-2026", type: "month" as const },
    { label: "2025", id: "2025", type: "year" as const },
    { label: "2024", id: "2024", type: "year" as const },
    { label: "2023", id: "2023", type: "year" as const },
    { label: "2022", id: "2022", type: "year" as const },
    { label: "2021", id: "2021", type: "year" as const },
    { label: "2020", id: "2020", type: "year" as const },
    { label: "2019", id: "2019", type: "year" as const },
    { label: "2018", id: "2018", type: "year" as const },
];

export function TimelineSidebar() {
    const [activeId, setActiveId] = useState("now");
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className="hidden xl:flex flex-col items-center py-4 w-16 shrink-0 sticky top-16 h-[calc(100vh-64px)] border-r border-[var(--border-default)] bg-[var(--bg-primary)]">
            {/* Scroll up indicator */}
            <button className="mb-2 p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors">
                <ChevronUp size={14} />
            </button>

            {/* Timeline items */}
            <nav className="flex-1 flex flex-col items-center gap-1 overflow-y-auto no-scrollbar py-1">
                {timelineItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`relative w-full flex items-center justify-center px-1 py-1.5 text-[10px] font-semibold tracking-wide transition-all duration-200 rounded-lg ${isActive
                                    ? "text-[var(--color-primary-light)]"
                                    : item.type === "current"
                                        ? "text-[var(--color-accent)]"
                                        : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                                } hover:bg-[var(--bg-surface)]`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="timelineActive"
                                    className="absolute inset-0 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Scroll down indicator */}
            <button className="mt-2 p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors">
                <ChevronDown size={14} />
            </button>
        </aside>
    );
}
