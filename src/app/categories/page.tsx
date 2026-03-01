"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/tools";
import { ArrowRight, Sparkles, TrendingUp, Layers } from "lucide-react";

export default function CategoriesPage() {
    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-2">
                    <span className="text-gradient">Categories</span>
                </h1>
                <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                    Browse AI tools organized by use case. From chatbots to code generators, find exactly what you need.
                </p>
            </motion.div>

            {/* Featured row */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
                {[
                    { label: "Most Popular", icon: TrendingUp, color: "var(--color-primary)", href: "/trending", desc: "See what's trending right now" },
                    { label: "Just Released", icon: Sparkles, color: "var(--color-accent)", href: "/", desc: "Fresh AI tools added today" },
                    { label: "All Tools", icon: Layers, color: "var(--color-warning)", href: "/", desc: "Browse the full directory" },
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="clay-card p-5 flex items-center gap-4 group"
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                        >
                            <item.icon size={22} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
                                {item.label}
                            </h3>
                            <p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p>
                        </div>
                        <ArrowRight size={16} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                ))}
            </motion.div>

            {/* Categories Grid */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">All Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                        >
                            <Link
                                href={`/categories/${cat.slug}`}
                                className="clay-card p-4 flex items-center gap-3 group h-full"
                                id={`category-${cat.slug}`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-plus)] flex items-center justify-center text-lg border border-[var(--border-default)] shrink-0">
                                    {cat.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-[var(--text-muted)]">
                                        {cat.toolCount} tools
                                    </p>
                                </div>
                                <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
