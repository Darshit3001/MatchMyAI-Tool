"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSavedTools } from "@/hooks/useSavedTools";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import {
    Star,
    ExternalLink,
    Share2,
    Bookmark,
    CheckCircle2,
    Globe,
    Building2,
    Calendar,
    Eye,
    MessageCircle,
    ThumbsUp,
    ThumbsDown,
    ArrowLeft,
    ChevronRight,
} from "lucide-react";

function formatCount(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
    return count.toString();
}

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const queryClient = useQueryClient();
    const [showReviewForm, setShowReviewForm] = useState(false);

    const { data: response, isLoading } = useQuery({
        queryKey: ["tool", slug],
        queryFn: async () => {
            const res = await fetch(`/api/tools/${slug}`);
            if (!res.ok) {
                if (res.status === 404) return null;
                throw new Error("Failed to fetch tool");
            }
            return res.json();
        },
    });

    const { data: reviewsData, isLoading: loadingReviews } = useQuery({
        queryKey: ["reviews", slug],
        queryFn: async () => {
            const res = await fetch(`/api/tools/${slug}/reviews`);
            if (!res.ok) throw new Error("Failed to fetch reviews");
            return res.json();
        },
        enabled: !!response?.data,
    });

    const { isSaved, toggleSave } = useSavedTools();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-32">
                <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const tool = response?.data;

    if (!tool) {
        notFound();
    }

    const saved = isSaved(tool.id);
    const reviews = reviewsData?.reviews || [];

    // Aggregate pros/cons from all reviews
    const allPros = reviews.flatMap((r: any) => r.pros || []).filter(Boolean);
    const allCons = reviews.flatMap((r: any) => r.cons || []).filter(Boolean);
    // Deduplicate and take top 5
    const uniquePros = [...new Set(allPros)] as string[];
    const uniqueCons = [...new Set(allCons)] as string[];

    const handleReviewSuccess = () => {
        setShowReviewForm(false);
        queryClient.invalidateQueries({ queryKey: ["reviews", slug] });
        queryClient.invalidateQueries({ queryKey: ["tool", slug] });
    };

    return (
        <div className="pb-24 lg:pb-8">
            {/* Breadcrumb */}
            <div className="px-4 lg:px-8 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Link href="/" className="hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1">
                        <ArrowLeft size={12} />
                        Home
                    </Link>
                    <ChevronRight size={12} />
                    <Link href={`/categories/${tool.category?.slug}`} className="hover:text-[var(--text-secondary)] transition-colors">
                        {tool.category?.name}
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-[var(--text-secondary)]">{tool.name}</span>
                </div>
            </div>

            {/* Tool Header */}
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="px-4 lg:px-8 pt-6 pb-6"
            >
                <div className="clay-card p-6 lg:p-8" style={{ cursor: "default" }}>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Logo */}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--bg-surface-plus)] to-[var(--bg-surface-elevated)] flex items-center justify-center text-3xl font-bold text-[var(--color-primary-light)] border border-[var(--border-default)] shadow-lg shrink-0">
                            {tool.logo ? (
                                <img src={tool.logo} alt={tool.name} className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                                tool.name.charAt(0)
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                                    {tool.name}
                                </h1>
                                {tool.isVerified && (
                                    <CheckCircle2 size={20} className="text-[var(--color-primary)]" fill="var(--color-primary)" strokeWidth={0} />
                                )}
                                {tool.version && (
                                    <span className="text-xs bg-[var(--bg-surface-plus)] px-2 py-0.5 rounded-full font-mono text-[var(--text-muted)] border border-[var(--border-default)]">
                                        v{tool.version}
                                    </span>
                                )}
                            </div>

                            <p className="text-[var(--text-secondary)] mb-4 max-w-2xl leading-relaxed">
                                {tool.description}
                            </p>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)]">
                                {tool.company && (
                                    <span className="flex items-center gap-1.5">
                                        <Building2 size={14} />
                                        {tool.company.name}
                                    </span>
                                )}
                                {tool.country && (
                                    <span className="flex items-center gap-1.5">
                                        <Globe size={14} />
                                        {tool.country === "US" ? "🇺🇸" : tool.country === "GB" ? "🇬🇧" : tool.country === "AU" ? "🇦🇺" : tool.country === "DE" ? "🇩🇪" : tool.country === "FR" ? "🇫🇷" : "🌍"} {tool.country}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5">
                                    <Eye size={14} />
                                    {formatCount(tool.viewCount)} views
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MessageCircle size={14} />
                                    {formatCount(tool.reviewCount)} reviews
                                </span>
                                <span className="flex items-center gap-1.5 text-[var(--color-warning)]">
                                    <Star size={14} fill="var(--color-warning)" />
                                    {tool.avgRating?.toFixed(1) || "0.0"} ({tool.reviewCount})
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 shrink-0">
                            <a
                                href={tool.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl"
                            >
                                <ExternalLink size={14} />
                                Visit Website
                            </a>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleSave(tool.slug, tool.id)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl transition-all ${saved
                                        ? "bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] font-medium"
                                        : "bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-plus)]"
                                        }`}
                                >
                                    <Bookmark size={14} className={saved ? "fill-[var(--color-primary)]" : ""} />
                                    {saved ? "Saved" : "Save"}
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-plus)] transition-all">
                                    <Share2 size={14} />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Content Grid */}
            <div className="px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="clay-card p-6"
                        style={{ cursor: "default" }}
                    >
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Pricing</h2>
                        <div className="flex flex-wrap gap-3">
                            {tool.pricingModel === "FREE" && (
                                <div className="badge-free px-4 py-2 rounded-xl text-sm font-semibold">100% Free</div>
                            )}
                            {tool.pricingModel === "FREEMIUM" && (
                                <>
                                    <div className="badge-free px-4 py-2 rounded-xl text-sm font-semibold">Free Tier</div>
                                    <div className="badge-paid px-4 py-2 rounded-xl text-sm font-semibold">From ${tool.priceFrom}/mo</div>
                                </>
                            )}
                            {tool.pricingModel === "PAID" && (
                                <div className="badge-paid px-4 py-2 rounded-xl text-sm font-semibold">From ${tool.priceFrom}/mo</div>
                            )}
                        </div>

                        {tool.deals && tool.deals.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
                                <h3 className="text-sm font-semibold text-[var(--color-success)] mb-2 inline-flex items-center gap-1.5">
                                    <Star size={14} fill="var(--color-success)" /> Special Deal Available
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)]">Use code <strong className="font-mono text-[var(--text-primary)] bg-[var(--bg-surface-plus)] px-1.5 py-0.5 rounded">{tool.deals[0].couponCode}</strong> to get {tool.deals[0].discount}% off.</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Pros & Cons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="clay-card p-6"
                        style={{ cursor: "default" }}
                    >
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Pros & Cons</h2>
                        {uniquePros.length > 0 || uniqueCons.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {uniquePros.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-[var(--color-success)] mb-3 flex items-center gap-1.5">
                                            <ThumbsUp size={14} /> Pros
                                        </h3>
                                        <ul className="space-y-2">
                                            {uniquePros.map((pro: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                    <span className="text-[var(--color-success)] mt-0.5">✓</span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {uniqueCons.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-[var(--color-error)] mb-3 flex items-center gap-1.5">
                                            <ThumbsDown size={14} /> Cons
                                        </h3>
                                        <ul className="space-y-2">
                                            {uniqueCons.map((con: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                    <span className="text-[var(--color-error)] mt-0.5">✗</span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-[var(--text-muted)] italic">Be the first to review this tool and share pros & cons!</p>
                        )}
                    </motion.div>

                    {/* Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="clay-card p-6"
                        style={{ cursor: "default" }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Reviews ({reviews.length})
                            </h2>
                            {!showReviewForm && (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="text-xs text-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-[var(--color-primary)]/10"
                                >
                                    ✏️ Write a review
                                </button>
                            )}
                        </div>

                        {/* Review Form (toggled) */}
                        <AnimatePresence>
                            {showReviewForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 overflow-hidden"
                                >
                                    <ReviewForm
                                        toolSlug={slug}
                                        onSuccess={handleReviewSuccess}
                                        onClose={() => setShowReviewForm(false)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            {loadingReviews ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-6 h-6 border-2 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin" />
                                </div>
                            ) : reviews.length > 0 ? (
                                reviews.map((review: any, idx: number) => (
                                    <ReviewCard key={review.id} review={review} index={idx} />
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-sm text-[var(--text-muted)] mb-3">No reviews yet. Be the first to share your experience!</p>
                                    {!showReviewForm && (
                                        <button
                                            onClick={() => setShowReviewForm(true)}
                                            className="text-sm text-[var(--color-primary)] hover:underline font-medium"
                                        >
                                            Write the first review →
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar (1 col) */}
                <div className="space-y-6">
                    {/* Category */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="clay-card p-5"
                        style={{ cursor: "default" }}
                    >
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Category</h3>
                        {tool.category && (
                            <Link
                                href={`/categories/${tool.category.slug}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-surface-plus)] hover:bg-[var(--bg-surface-elevated)] transition-colors border border-[var(--border-default)]"
                            >
                                <span>{tool.category.icon}</span>
                                <span className="text-sm font-medium text-[var(--text-secondary)]">{tool.category.name}</span>
                            </Link>
                        )}
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="clay-card p-5"
                        style={{ cursor: "default" }}
                    >
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Stats</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Views", value: formatCount(tool.viewCount), icon: Eye },
                                { label: "Saves", value: formatCount(tool.saveCount + (saved ? 1 : 0)), icon: Bookmark },
                                { label: "Reviews", value: formatCount(tool.reviewCount), icon: MessageCircle },
                                { label: "Rating", value: `${tool.avgRating?.toFixed(1) || "0.0"} / 5`, icon: Star },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                                        <stat.icon size={13} />
                                        {stat.label}
                                    </span>
                                    <span className="text-sm font-medium text-[var(--text-secondary)]">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Alternatives */}
                    {tool.alternatives && tool.alternatives.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="clay-card p-5"
                            style={{ cursor: "default" }}
                        >
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Alternatives</h3>
                            <div className="space-y-2">
                                {tool.alternatives.map((alt: any) => (
                                    <Link
                                        key={alt.id}
                                        href={`/tool/${alt.slug}`}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-surface-plus)] transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-xs font-bold text-[var(--color-primary-light)] border border-[var(--border-default)]">
                                            {alt.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                                {alt.name}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star size={10} className="text-[var(--color-warning)]" fill="var(--color-warning)" />
                                                <span className="text-[10px] text-[var(--text-muted)]">{alt.avgRating?.toFixed(1) || "0.0"}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
