"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { searchTools, categories } from "@/data/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Search, X, SlidersHorizontal, Tag } from "lucide-react";
import { useFilterStore } from "@/stores/filterStore";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { freeMode, toggleFreeMode } = useFilterStore();

    const results = useMemo(() => {
        let filtered = query.length >= 1 ? searchTools(query) : [];
        if (selectedCategory) {
            filtered = filtered.filter((t) => t.category.slug === selectedCategory);
        }
        if (freeMode) {
            filtered = filtered.filter((t) => t.pricingModel === "FREE");
        }
        return filtered;
    }, [query, selectedCategory, freeMode]);

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-4"
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
                    Search
                </h1>

                {/* Search input */}
                <div className="relative mb-4">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search AI tools, categories, tasks..."
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors text-sm"
                        autoFocus
                        id="search-page-input"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap mb-6">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <SlidersHorizontal size={12} />
                        Filters:
                    </div>
                    <button
                        onClick={toggleFreeMode}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${freeMode
                                ? "bg-[var(--color-free)]/15 text-[var(--color-free)] border-[var(--color-free)]/30"
                                : "bg-[var(--bg-surface)] text-[var(--text-tertiary)] border-[var(--border-default)] hover:text-[var(--text-secondary)]"
                            }`}
                    >
                        🆓 Free Only
                    </button>
                    {categories.slice(0, 8).map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${selectedCategory === cat.slug
                                    ? "bg-[var(--color-primary)]/15 text-[var(--color-primary-light)] border-[var(--color-primary)]/30"
                                    : "bg-[var(--bg-surface)] text-[var(--text-tertiary)] border-[var(--border-default)] hover:text-[var(--text-secondary)]"
                                }`}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Results */}
            {query.length >= 1 ? (
                <div>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                        {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                        {selectedCategory && <span> in {selectedCategory}</span>}
                    </p>
                    <ToolGrid tools={results} />
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface)] flex items-center justify-center text-3xl mx-auto mb-4 border border-[var(--border-default)]">
                        🔍
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        Start searching
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)] max-w-sm mx-auto">
                        Type a tool name, category, or task to discover AI tools
                    </p>
                </div>
            )}
        </div>
    );
}
