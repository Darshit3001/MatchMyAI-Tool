"use client";

import { motion } from "framer-motion";
import { tools as allTools } from "@/data/tools";
import { Layers, Heart, Code2, Briefcase, Palette, Globe, Lock, Users2, Plus } from "lucide-react";
import Link from "next/link";

const collections = [
    {
        id: "1", slug: "ai-starter-pack", name: "AI Starter Pack",
        description: "Essential AI tools everyone should know about",
        icon: "🚀", toolCount: 8, isPublic: true,
        user: { name: "MatchMyAI Tool Team", avatar: null },
        toolPreviews: allTools.slice(0, 4),
    },
    {
        id: "2", slug: "best-free-tools", name: "Best Free AI Tools",
        description: "Top-tier AI tools that won't cost you a dime",
        icon: "🆓", toolCount: 12, isPublic: true,
        user: { name: "Community", avatar: null },
        toolPreviews: allTools.filter(t => t.pricingModel === "FREE").slice(0, 4),
    },
    {
        id: "3", slug: "developer-toolkit", name: "Developer Toolkit",
        description: "AI tools every developer needs in their workflow",
        icon: "💻", toolCount: 6, isPublic: true,
        user: { name: "DevOps Pro", avatar: null },
        toolPreviews: allTools.filter(t => t.categoryId === "4").slice(0, 4),
    },
    {
        id: "4", slug: "content-creation", name: "Content Creation Suite",
        description: "Write, design, and produce content with AI",
        icon: "✍️", toolCount: 10, isPublic: true,
        user: { name: "Marketing Hub", avatar: null },
        toolPreviews: allTools.filter(t => ["3", "8"].includes(t.categoryId)).slice(0, 4),
    },
    {
        id: "5", slug: "creative-tools", name: "Creative AI Collection",
        description: "Image, video, and audio generation tools",
        icon: "🎨", toolCount: 9, isPublic: true,
        user: { name: "ArtStation AI", avatar: null },
        toolPreviews: allTools.filter(t => ["2", "5", "6"].includes(t.categoryId)).slice(0, 4),
    },
    {
        id: "6", slug: "productivity-boost", name: "Productivity Boost",
        description: "Automate your work and get more done with AI",
        icon: "⚡", toolCount: 7, isPublic: true,
        user: { name: "Efficiency Expert", avatar: null },
        toolPreviews: allTools.filter(t => ["7", "20"].includes(t.categoryId)).slice(0, 4),
    },
];

export default function CollectionsPage() {
    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20">
                            <Layers size={24} className="text-[var(--color-primary)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">Collections</h1>
                            <p className="text-sm text-[var(--text-tertiary)]">
                                Curated lists of AI tools for every workflow
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25">
                        <Plus size={14} />
                        <span className="hidden sm:inline">New Collection</span>
                    </button>
                </div>
            </motion.div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {collections.map((col, i) => (
                    <motion.div
                        key={col.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                    >
                        <Link href={`/collections/${col.slug}`} className="block">
                            <article className="clay-card p-5 h-full flex flex-col group">
                                {/* Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-plus)] flex items-center justify-center text-xl border border-[var(--border-default)]">
                                        {col.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
                                            {col.name}
                                        </h3>
                                        <p className="text-xs text-[var(--text-tertiary)] line-clamp-2">{col.description}</p>
                                    </div>
                                </div>

                                {/* Tool preview strip */}
                                <div className="flex items-center gap-1 mb-3">
                                    {col.toolPreviews.map((tool) => (
                                        <div
                                            key={tool.id}
                                            className="w-8 h-8 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-[10px] font-bold text-[var(--color-primary-light)] border border-[var(--border-default)]"
                                            title={tool.name}
                                        >
                                            {tool.name.charAt(0)}
                                        </div>
                                    ))}
                                    {col.toolCount > 4 && (
                                        <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center text-[10px] font-medium text-[var(--text-muted)] border border-[var(--border-default)]">
                                            +{col.toolCount - 4}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="mt-auto flex items-center justify-between text-xs text-[var(--text-muted)]">
                                    <span className="flex items-center gap-1">
                                        <Users2 size={11} />
                                        {col.user.name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        {col.isPublic ? <Globe size={11} /> : <Lock size={11} />}
                                        {col.toolCount} tools
                                    </span>
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
