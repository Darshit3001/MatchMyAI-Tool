"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Tool } from "@/types";
import {
    ExternalLink,
    Share2,
    Eye,
    Bookmark,
    Star,
    Clock,
    CheckCircle2,
    ThumbsUp,
    MessageCircle,
} from "lucide-react";
import { useSavedTools } from "@/hooks/useSavedTools";

function formatCount(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
    return count.toString();
}

function timeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 30) return `${diffD}d ago`;
    const diffM = Math.floor(diffD / 30);
    if (diffM < 12) return `${diffM}mo ago`;
    return `${Math.floor(diffM / 12)}y ago`;
}

function PricingBadge({ tool }: { tool: Tool }) {
    if (tool.pricingModel === "FREE") {
        return <span className="badge-free px-2 py-0.5 rounded-full text-xs font-semibold">100% Free</span>;
    }
    if (tool.pricingModel === "FREEMIUM") {
        return (
            <span className="badge-freemium px-2 py-0.5 rounded-full text-xs font-semibold">
                Free + from ${tool.priceFrom}/mo
            </span>
        );
    }
    if (tool.pricingModel === "PAID") {
        return (
            <span className="badge-paid px-2 py-0.5 rounded-full text-xs font-semibold">
                From ${tool.priceFrom}/mo
            </span>
        );
    }
    return <span className="text-xs text-[var(--text-tertiary)]">Contact for pricing</span>;
}

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
    const { isSaved, toggleSave } = useSavedTools();
    const saved = isSaved(tool.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
        >
            <Link href={`/tool/${tool.slug}`} className="block" id={`tool-card-${tool.slug}`}>
                <article className="clay-card p-5 h-full flex flex-col gap-3 group cursor-pointer relative overflow-hidden">
                    {/* Sponsored label */}
                    {tool.isSponsored && (
                        <div className="absolute top-3 right-3">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-2 py-0.5 rounded-full border border-[var(--color-warning)]/30">
                                Sponsor
                            </span>
                        </div>
                    )}

                    {/* Header: Icon + Name + Verified */}
                    <div className="flex items-start gap-3">
                        {/* Tool Logo */}
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--bg-surface-plus)] to-[var(--bg-surface-elevated)] flex items-center justify-center text-lg font-bold text-[var(--color-primary-light)] border border-[var(--border-default)] shrink-0 shadow-sm">
                            {tool.logo ? (
                                <img src={tool.logo} alt={tool.name} className="w-full h-full rounded-xl object-cover" />
                            ) : (
                                tool.name.charAt(0)
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--color-primary-light)] transition-colors">
                                    {tool.name}
                                </h3>
                                {tool.isVerified && (
                                    <CheckCircle2
                                        size={14}
                                        className="text-[var(--color-primary)] shrink-0"
                                        fill="var(--color-primary)"
                                        strokeWidth={0}
                                    />
                                )}
                                {tool.version && (
                                    <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface-plus)] px-1.5 py-0.5 rounded font-mono">
                                        v{tool.version}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-0.5 leading-relaxed">
                                {tool.description}
                            </p>
                        </div>
                    </div>

                    {/* Category Tag */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-surface-plus)] text-[var(--text-secondary)] border border-[var(--border-default)]">
                            <span>{tool.category.icon}</span>
                            {tool.category.name}
                        </span>
                        {tool.country && (
                            <span className="text-xs text-[var(--text-muted)]">
                                {tool.country === "US" ? "🇺🇸" : tool.country === "GB" ? "🇬🇧" : tool.country === "AU" ? "🇦🇺" : tool.country === "DE" ? "🇩🇪" : tool.country === "FR" ? "🇫🇷" : "🌍"}{" "}
                                {tool.country}
                            </span>
                        )}
                    </div>

                    {/* Comment Preview (optional) */}
                    {tool.commentPreview && (
                        <div className="bg-[var(--bg-surface-plus)]/60 rounded-lg p-3 border border-[var(--border-default)]">
                            <div className="flex items-center gap-1.5 mb-1">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-[8px] text-white font-bold">
                                    {tool.commentPreview.userName.charAt(0)}
                                </div>
                                <span className="text-xs font-medium text-[var(--text-secondary)]">
                                    {tool.commentPreview.userName}
                                </span>
                            </div>
                            <p className="text-xs text-[var(--text-tertiary)] line-clamp-2 leading-relaxed">
                                {tool.commentPreview.content}
                            </p>
                            <div className="flex items-center gap-1 mt-1.5">
                                <ThumbsUp size={10} className="text-[var(--text-muted)]" />
                                <span className="text-[10px] text-[var(--text-muted)]">{tool.commentPreview.upvotes}</span>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-[var(--border-default)]" />

                    {/* Footer: Meta + Stats */}
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
                            <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {timeAgo(tool.releasedAt)}
                            </span>
                            <PricingBadge tool={tool} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <Eye size={11} />
                                {formatCount(tool.viewCount)}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleSave(tool.slug, tool.id);
                                }}
                                className={`flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors ${saved ? 'text-[var(--color-primary)] font-medium' : ''}`}
                                title={saved ? "Unsave tool" : "Save tool"}
                            >
                                <Bookmark size={11} className={saved ? "fill-[var(--color-primary)]" : ""} />
                                {formatCount(tool.saveCount + (saved ? 1 : 0))}
                            </button>
                            {tool.reviewCount > 0 && (
                                <span className="flex items-center gap-1">
                                    <MessageCircle size={11} />
                                    {formatCount(tool.reviewCount)}
                                </span>
                            )}
                        </div>
                        <span className="flex items-center gap-1 text-[var(--color-warning)]">
                            <Star size={11} fill="var(--color-warning)" />
                            {tool.avgRating.toFixed(1)}
                        </span>
                    </div>

                    {/* Action buttons on hover */}
                    <div className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
                            title="Visit website"
                        >
                            <ExternalLink size={12} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                            title="Share"
                        >
                            <Share2 size={12} />
                        </button>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}

export function ToolCardSkeleton() {
    return (
        <div className="clay-card p-5 space-y-3" style={{ pointerEvents: "none" }}>
            <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl skeleton" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 skeleton" />
                    <div className="h-3 w-full skeleton" />
                </div>
            </div>
            <div className="h-6 w-24 skeleton rounded-lg" />
            <div className="border-t border-[var(--border-default)]" />
            <div className="flex justify-between">
                <div className="h-3 w-20 skeleton" />
                <div className="h-3 w-12 skeleton" />
            </div>
        </div>
    );
}
