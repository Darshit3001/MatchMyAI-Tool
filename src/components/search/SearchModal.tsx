"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/uiStore";
import { searchTools } from "@/data/tools";
import { type Tool } from "@/types";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const trendingSearches = [
    "ChatGPT", "Midjourney", "Sora", "Claude", "Cursor", "Stable Diffusion"
];

export function SearchModal() {
    const { searchOpen, setSearchOpen } = useUIStore();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Tool[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Ctrl+K shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === "Escape") {
                setSearchOpen(false);
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [setSearchOpen]);

    // Focus input when modal opens
    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [searchOpen]);

    // Search
    useEffect(() => {
        if (query.length >= 2) {
            setResults(searchTools(query).slice(0, 8));
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <AnimatePresence>
            {searchOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        onClick={() => setSearchOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed top-[10%] left-1/2 -translate-x-1/2 z-[101] w-[95%] max-w-2xl"
                    >
                        <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-hover)]">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-default)]">
                                <Search size={20} className="text-[var(--text-tertiary)] shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search AI tools, categories, tasks..."
                                    className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-base"
                                    id="search-input"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="w-7 h-7 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Results / Suggestions */}
                            <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-3">
                                {results.length > 0 ? (
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-[var(--text-muted)] px-2 py-1">
                                            Results ({results.length})
                                        </p>
                                        {results.map((tool) => (
                                            <Link
                                                key={tool.id}
                                                href={`/tool/${tool.slug}`}
                                                onClick={() => setSearchOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-surface-plus)] transition-colors group"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-sm font-bold text-[var(--color-primary-light)] border border-[var(--border-default)]">
                                                    {tool.name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-medium text-[var(--text-primary)]">
                                                            {tool.name}
                                                        </span>
                                                        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                                                            {tool.category.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-[var(--text-tertiary)] truncate">
                                                        {tool.description}
                                                    </p>
                                                </div>
                                                <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>
                                ) : query.length === 0 ? (
                                    <div className="space-y-4">
                                        {/* Trending */}
                                        <div>
                                            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] px-2 py-1">
                                                <TrendingUp size={12} />
                                                Trending searches
                                            </p>
                                            <div className="flex flex-wrap gap-2 px-2 pt-1">
                                                {trendingSearches.map((term) => (
                                                    <button
                                                        key={term}
                                                        onClick={() => setQuery(term)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-surface-plus)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors border border-[var(--border-default)]"
                                                    >
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quick links */}
                                        <div>
                                            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] px-2 py-1">
                                                <Clock size={12} />
                                                Quick actions
                                            </p>
                                            <div className="space-y-1">
                                                {[
                                                    { label: "Browse all categories", href: "/categories" },
                                                    { label: "View trending tools", href: "/trending" },
                                                    { label: "Take the recommendation quiz", href: "/quiz" },
                                                ].map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setSearchOpen(false)}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-plus)] transition-colors"
                                                    >
                                                        <ArrowRight size={12} className="text-[var(--text-muted)]" />
                                                        {link.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-sm text-[var(--text-tertiary)]">
                                            No results for &ldquo;{query}&rdquo;
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)] mt-1">
                                            Try a different search term
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-default)] text-[10px] text-[var(--text-muted)]">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 py-0.5 bg-[var(--bg-surface-plus)] rounded text-[var(--text-muted)] border border-[var(--border-default)]">↵</kbd>
                                        to select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 py-0.5 bg-[var(--bg-surface-plus)] rounded text-[var(--text-muted)] border border-[var(--border-default)]">esc</kbd>
                                        to close
                                    </span>
                                </div>
                                <span>Powered by APT AI</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
