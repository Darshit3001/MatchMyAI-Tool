"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { tools as allTools } from "@/data/tools";
import { Trophy, Medal, Star, Eye, TrendingUp, Crown } from "lucide-react";
import Link from "next/link";

function formatCount(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
    return count.toString();
}

type SortBy = "views" | "rating" | "saves";

export default function LeaderboardPage() {
    const [sortBy, setSortBy] = useState<SortBy>("views");

    const sorted = [...allTools].sort((a, b) => {
        if (sortBy === "views") return b.viewCount - a.viewCount;
        if (sortBy === "rating") return b.avgRating - a.avgRating;
        return b.saveCount - a.saveCount;
    });

    const getMedalColor = (index: number) => {
        if (index === 0) return { bg: "rgba(255, 215, 0, 0.15)", border: "rgba(255, 215, 0, 0.3)", text: "#FFD700", icon: Crown };
        if (index === 1) return { bg: "rgba(192, 192, 192, 0.15)", border: "rgba(192, 192, 192, 0.3)", text: "#C0C0C0", icon: Medal };
        if (index === 2) return { bg: "rgba(205, 127, 50, 0.15)", border: "rgba(205, 127, 50, 0.3)", text: "#CD7F32", icon: Medal };
        return null;
    };

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-warning)]/10 flex items-center justify-center border border-[var(--color-warning)]/20">
                        <Trophy size={24} className="text-[var(--color-warning)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                            Leaderboard
                        </h1>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            Top AI tools ranked by the community
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sort tabs */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] w-fit mb-6"
            >
                {([
                    { id: "views" as SortBy, label: "Most Viewed", icon: Eye },
                    { id: "rating" as SortBy, label: "Top Rated", icon: Star },
                    { id: "saves" as SortBy, label: "Most Saved", icon: TrendingUp },
                ]).map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSortBy(tab.id)}
                        className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${sortBy === tab.id
                                ? "text-[var(--text-primary)] bg-[var(--color-primary)]/15"
                                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                            }`}
                    >
                        <tab.icon size={14} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </motion.div>

            {/* Leaderboard list */}
            <div className="space-y-2">
                {sorted.map((tool, index) => {
                    const medal = getMedalColor(index);
                    return (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            <Link
                                href={`/tool/${tool.slug}`}
                                className={`clay-card p-4 flex items-center gap-4 group ${medal ? "" : ""
                                    }`}
                                style={medal ? { borderColor: medal.border } : undefined}
                                id={`leaderboard-${index + 1}`}
                            >
                                {/* Rank */}
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${medal
                                            ? ""
                                            : "bg-[var(--bg-surface-plus)] text-[var(--text-muted)]"
                                        }`}
                                    style={
                                        medal
                                            ? { background: medal.bg, border: `1px solid ${medal.border}`, color: medal.text }
                                            : undefined
                                    }
                                >
                                    {medal ? <medal.icon size={18} /> : `#${index + 1}`}
                                </div>

                                {/* Tool icon */}
                                <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-plus)] flex items-center justify-center text-sm font-bold text-[var(--color-primary-light)] border border-[var(--border-default)] shrink-0">
                                    {tool.name.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">
                                            {tool.name}
                                        </h3>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-surface-plus)] text-[var(--text-muted)] border border-[var(--border-default)]">
                                            {tool.category.icon} {tool.category.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[var(--text-tertiary)] truncate">{tool.description}</p>
                                </div>

                                {/* Stats */}
                                <div className="hidden sm:flex items-center gap-5 shrink-0 text-xs">
                                    <div className="text-center">
                                        <div className="font-semibold text-[var(--text-primary)]">{formatCount(tool.viewCount)}</div>
                                        <div className="text-[var(--text-muted)]">views</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-[var(--color-warning)] flex items-center gap-0.5 justify-center">
                                            <Star size={10} fill="var(--color-warning)" />
                                            {tool.avgRating.toFixed(1)}
                                        </div>
                                        <div className="text-[var(--text-muted)]">rating</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-[var(--text-primary)]">{formatCount(tool.saveCount)}</div>
                                        <div className="text-[var(--text-muted)]">saves</div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
