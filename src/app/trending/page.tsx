"use client";

import { motion } from "framer-motion";
import { getTrendingTools } from "@/data/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { TrendingUp, Flame } from "lucide-react";

export default function TrendingPage() {
    const trendingTools = getTrendingTools(24);

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-error)]/10 flex items-center justify-center border border-[var(--color-error)]/20">
                        <Flame size={24} className="text-[var(--color-error)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                            Trending
                        </h1>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            The most popular AI tools right now, ranked by views and engagement
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Trending ranking indicators */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-6 flex-wrap"
            >
                {trendingTools.slice(0, 5).map((tool, i) => (
                    <div
                        key={tool.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] text-xs"
                    >
                        <span className={`font-bold ${i === 0 ? "text-[var(--color-warning)]" : i === 1 ? "text-[var(--text-secondary)]" : i === 2 ? "text-[var(--color-warning)]/70" : "text-[var(--text-muted)]"}`}>
                            #{i + 1}
                        </span>
                        <span className="text-[var(--text-secondary)] font-medium">{tool.name}</span>
                        <TrendingUp size={10} className="text-[var(--color-success)]" />
                    </div>
                ))}
            </motion.div>

            <ToolGrid tools={trendingTools} />
        </div>
    );
}
