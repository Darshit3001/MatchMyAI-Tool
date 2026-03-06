"use client";

import { motion } from "framer-motion";
import { tools as allTools } from "@/data/tools";
import { ArrowLeft, Globe, Lock, Users2, Star, ExternalLink, BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

const collections = [
    {
        id: "1", slug: "ai-starter-pack", name: "AI Starter Pack",
        description: "Essential AI tools everyone should know about. This curated list covers chatbots, image generation, writing assistants, and code helpers — the perfect starting point for anyone new to AI.",
        icon: "🚀", isPublic: true,
        user: { name: "MatchMyAI Tool Team", avatar: null },
        toolIds: allTools.slice(0, 8).map(t => t.id),
        tags: ["Beginner", "Essential", "All-in-one"],
    },
    {
        id: "2", slug: "best-free-tools", name: "Best Free AI Tools",
        description: "Top-tier AI tools that won't cost you a dime. These are the best free options across every category — no credit card, no trial period, just pure AI power.",
        icon: "🆓", isPublic: true,
        user: { name: "Community", avatar: null },
        toolIds: allTools.filter(t => t.pricingModel === "FREE").slice(0, 12).map(t => t.id),
        tags: ["Free", "Budget-friendly", "No signup"],
    },
    {
        id: "3", slug: "developer-toolkit", name: "Developer Toolkit",
        description: "AI tools every developer needs in their workflow. From code completion to documentation generation, these tools will supercharge your development process.",
        icon: "💻", isPublic: true,
        user: { name: "DevOps Pro", avatar: null },
        toolIds: allTools.filter(t => t.categoryId === "4").slice(0, 6).map(t => t.id),
        tags: ["Development", "Code", "DevOps"],
    },
    {
        id: "4", slug: "content-creation", name: "Content Creation Suite",
        description: "Write, design, and produce content with AI. Whether you're a blogger, social media manager, or marketer — these tools handle everything from ideation to publication.",
        icon: "✍️", isPublic: true,
        user: { name: "Marketing Hub", avatar: null },
        toolIds: allTools.filter(t => ["3", "8"].includes(t.categoryId)).slice(0, 10).map(t => t.id),
        tags: ["Writing", "Marketing", "Social Media"],
    },
    {
        id: "5", slug: "creative-tools", name: "Creative AI Collection",
        description: "Image, video, and audio generation tools for creative professionals. Transform your ideas into stunning visuals, music, and videos with the power of generative AI.",
        icon: "🎨", isPublic: true,
        user: { name: "ArtStation AI", avatar: null },
        toolIds: allTools.filter(t => ["2", "5", "6"].includes(t.categoryId)).slice(0, 9).map(t => t.id),
        tags: ["Design", "Video", "Audio", "Art"],
    },
    {
        id: "6", slug: "productivity-boost", name: "Productivity Boost",
        description: "Automate your work and get more done with AI. These tools handle scheduling, email, research, and task management so you can focus on what actually matters.",
        icon: "⚡", isPublic: true,
        user: { name: "Efficiency Expert", avatar: null },
        toolIds: allTools.filter(t => ["7", "20"].includes(t.categoryId)).slice(0, 7).map(t => t.id),
        tags: ["Automation", "Workflow", "Time-saving"],
    },
];

export default function CollectionDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const collection = collections.find(c => c.slug === slug);

    if (!collection) return notFound();

    const collectionTools = allTools.filter(t => collection.toolIds.includes(t.id));

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            {/* Back button */}
            <div className="pt-6 pb-4">
                <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Collections
                </Link>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="clay-card p-6 mb-6"
            >
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-plus)] flex items-center justify-center text-3xl border border-[var(--border-default)] flex-shrink-0">
                        {collection.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                                    {collection.name}
                                </h1>
                                <p className="text-sm text-[var(--text-tertiary)] leading-relaxed max-w-2xl">
                                    {collection.description}
                                </p>
                            </div>
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25 flex-shrink-0">
                                <BookmarkPlus size={14} />
                                Save Collection
                            </button>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                            <span className="flex items-center gap-1">
                                <Users2 size={12} />
                                {collection.user.name}
                            </span>
                            <span className="flex items-center gap-1">
                                {collection.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                                {collection.isPublic ? "Public" : "Private"}
                            </span>
                            <span>{collectionTools.length} tools</span>
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                            {collection.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] border border-[var(--color-primary)]/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tools Grid */}
            <h2 className="text-base font-semibold text-[var(--text-secondary)] mb-4">
                Tools in this collection
            </h2>

            {collectionTools.length === 0 ? (
                <div className="clay-card p-12 text-center">
                    <p className="text-[var(--text-muted)]">No tools in this collection yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {collectionTools.map((tool, i) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.04 * i }}
                        >
                            <Link href={`/tool/${tool.slug}`} className="block">
                                <article className="clay-card p-4 h-full flex flex-col group hover:border-[var(--color-primary)]/30 transition-all">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-plus)] flex items-center justify-center text-base font-bold text-[var(--color-primary-light)] border border-[var(--border-default)] flex-shrink-0">
                                            {tool.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">
                                                {tool.name}
                                            </h3>
                                            <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-default)] mt-0.5">
                                                {tool.pricingModel}
                                            </span>
                                        </div>
                                        <ExternalLink size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                                    </div>

                                    <p className="text-xs text-[var(--text-tertiary)] line-clamp-2 flex-1">
                                        {tool.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[var(--border-default)]">
                                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-medium text-[var(--text-secondary)]">
                                            {tool.avgRating.toFixed(1)}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)] ml-1">
                                            ({tool.reviewCount} reviews)
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
