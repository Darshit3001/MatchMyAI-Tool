"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

interface ReviewCardProps {
    review: {
        id: string;
        rating: number;
        title?: string | null;
        content: string;
        pros: string[];
        cons: string[];
        upvotes: number;
        downvotes: number;
        createdAt: string;
        user: {
            id: string;
            name: string;
            avatar?: string | null;
        };
    };
    index?: number;
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

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 rounded-xl bg-[var(--bg-surface-plus)]/50 border border-[var(--border-default)] hover:border-[var(--border-default)]/80 transition-colors"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    {review.user.avatar ? (
                        <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-sm text-white font-bold shadow-sm">
                            {review.user.name.charAt(0)}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-[var(--text-primary)]">
                                {review.user.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        className={
                                            i < review.rating
                                                ? "text-[var(--color-warning)]"
                                                : "text-[var(--text-muted)]"
                                        }
                                        fill={i < review.rating ? "var(--color-warning)" : "none"}
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] text-[var(--text-muted)]">
                                {timeAgo(review.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            {review.title && (
                <h4 className="font-semibold text-[var(--text-primary)] mb-1.5">
                    {review.title}
                </h4>
            )}

            {/* Content */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {review.content}
            </p>

            {/* Pros & Cons */}
            {(review.pros.length > 0 || review.cons.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {review.pros.length > 0 && (
                        <div className="space-y-1">
                            {review.pros.map((pro, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]"
                                >
                                    <span className="text-[var(--color-success)] mt-0.5 shrink-0">✓</span>
                                    {pro}
                                </div>
                            ))}
                        </div>
                    )}
                    {review.cons.length > 0 && (
                        <div className="space-y-1">
                            {review.cons.map((con, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]"
                                >
                                    <span className="text-[var(--color-error)] mt-0.5 shrink-0">✗</span>
                                    {con}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2 border-t border-[var(--border-default)]">
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors group">
                    <ThumbsUp size={13} className="group-hover:scale-110 transition-transform" />
                    <span>{review.upvotes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--color-error)] transition-colors group">
                    <ThumbsDown size={13} className="group-hover:scale-110 transition-transform" />
                    <span>{review.downvotes}</span>
                </button>
            </div>
        </motion.div>
    );
}
