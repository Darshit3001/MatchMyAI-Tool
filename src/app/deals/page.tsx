"use client";

import { motion } from "framer-motion";
import { tools as allTools } from "@/data/tools";
import { Tag, Percent, Zap, Clock, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

// Mock deals
const deals = allTools
    .filter((t) => t.pricingModel === "FREEMIUM" || t.pricingModel === "PAID")
    .slice(0, 12)
    .map((tool, i) => ({
        ...tool,
        discount: [20, 30, 40, 50, 25, 35, 15, 60, 45, 30, 20, 55][i],
        originalPrice: (tool.priceFrom || 20) * 1.5,
        expiresIn: `${[3, 5, 7, 2, 10, 4, 6, 1, 8, 12, 9, 3][i]} days`,
        code: [`APTAI20`, `SAVE30`, `NEWYEAR`, `LAUNCH50`, `DEAL25`, `SPRING35`, `TRY15`, `BIG60`, `FLASH45`, `PROMO30`, `INTRO20`, `MEGA55`][i],
    }));

function formatCount(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
    return count.toString();
}

export default function DealsPage() {
    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center border border-[var(--color-success)]/20">
                        <Tag size={24} className="text-[var(--color-success)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                            Deals & Discounts
                        </h1>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            Save on the best AI tools with exclusive offers and coupon codes
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Deals banner */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-accent)]/5 rounded-full blur-[60px]" />
                <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={18} className="text-[var(--color-warning)]" />
                        <span className="text-sm font-semibold text-[var(--color-warning)]">Limited Time</span>
                    </div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                        Active deals on {deals.length} AI tools
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Exclusive discounts curated by APT AI. Use the codes below at checkout.
                    </p>
                </div>
            </motion.div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deals.map((deal, i) => (
                    <motion.div
                        key={deal.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                    >
                        <div className="clay-card p-5 h-full flex flex-col" style={{ cursor: "default" }}>
                            {/* Discount badge */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-sm font-bold text-[var(--color-primary-light)] border border-[var(--border-default)]">
                                        {deal.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{deal.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star size={10} className="text-[var(--color-warning)]" fill="var(--color-warning)" />
                                            <span className="text-[10px] text-[var(--text-muted)]">{deal.avgRating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--color-success)]/15 text-[var(--color-success)] border border-[var(--color-success)]/30">
                                    <Percent size={10} />
                                    {deal.discount}% OFF
                                </span>
                            </div>

                            <p className="text-xs text-[var(--text-tertiary)] line-clamp-2 mb-3 flex-1">{deal.description}</p>

                            {/* Pricing */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-bold text-[var(--text-primary)]">
                                    ${deal.priceFrom?.toFixed(0)}/mo
                                </span>
                                <span className="text-xs text-[var(--text-muted)] line-through">
                                    ${deal.originalPrice.toFixed(0)}/mo
                                </span>
                            </div>

                            {/* Code + expiry */}
                            <div className="flex items-center justify-between mb-3">
                                <code className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[var(--bg-surface-plus)] text-[var(--color-accent)] border border-dashed border-[var(--color-accent)]/30">
                                    {deal.code}
                                </code>
                                <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                                    <Clock size={10} />
                                    Expires in {deal.expiresIn}
                                </span>
                            </div>

                            {/* CTA */}
                            <Link
                                href={`/tool/${deal.slug}`}
                                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/25 text-[var(--color-primary-light)] text-sm font-medium hover:bg-[var(--color-primary)]/25 transition-colors"
                            >
                                Get Deal <ExternalLink size={12} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
