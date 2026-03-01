"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart, ExternalLink } from "lucide-react";

const merchItems = [
    {
        id: "1", name: "APT AI Classic Tee", price: 29.99,
        description: "Premium cotton t-shirt with the APT AI logo",
        category: "Apparel", colors: ["#1a1a2e", "#ffffff", "#7C5CFC"],
        rating: 4.8, reviews: 127, badge: "Best Seller",
    },
    {
        id: "2", name: "AI Explorer Hoodie", price: 59.99,
        description: "Cozy heavyweight hoodie for late-night coding sessions",
        category: "Apparel", colors: ["#1a1a2e", "#2d2d44"],
        rating: 4.9, reviews: 89, badge: "New",
    },
    {
        id: "3", name: "Neural Network Mug", price: 18.99,
        description: "Ceramic mug with generative art pattern",
        category: "Accessories", colors: ["#ffffff", "#1a1a2e"],
        rating: 4.7, reviews: 203, badge: null,
    },
    {
        id: "4", name: "Prompt Engineer Cap", price: 24.99,
        description: "Embroidered dad cap for the AI-first builder",
        category: "Accessories", colors: ["#1a1a2e", "#7C5CFC", "#ffffff"],
        rating: 4.6, reviews: 67, badge: null,
    },
    {
        id: "5", name: "AI Sticker Pack", price: 9.99,
        description: "25 high-quality vinyl stickers for your laptop",
        category: "Accessories", colors: [],
        rating: 4.9, reviews: 342, badge: "Popular",
    },
    {
        id: "6", name: "Future of AI Poster", price: 19.99,
        description: "Limited edition AI-generated art print (18×24\")",
        category: "Art", colors: [],
        rating: 4.8, reviews: 55, badge: "Limited",
    },
];

export default function MerchPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [liked, setLiked] = useState<Set<string>>(new Set());

    const filteredItems = selectedCategory
        ? merchItems.filter((i) => i.category === selectedCategory)
        : merchItems;

    const toggleLike = (id: string) => {
        setLiked((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
                        <ShoppingBag size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                            APT AI <span className="text-gradient">Merch</span>
                        </h1>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            Wear the future. Premium goods for AI enthusiasts.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Category filters */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-6"
            >
                {[null, "Apparel", "Accessories", "Art"].map((cat) => (
                    <button
                        key={cat || "all"}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedCategory === cat
                                ? "bg-[var(--color-primary)]/15 text-[var(--color-primary-light)] border-[var(--color-primary)]/30"
                                : "bg-[var(--bg-surface)] text-[var(--text-tertiary)] border-[var(--border-default)] hover:text-[var(--text-secondary)]"
                            }`}
                    >
                        {cat || "All"}
                    </button>
                ))}
            </motion.div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                    >
                        <article className="clay-card overflow-hidden group h-full flex flex-col">
                            {/* Product image placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-[var(--bg-surface-plus)] to-[var(--bg-surface)] flex items-center justify-center overflow-hidden">
                                <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                                    {item.category === "Apparel" ? "👕" : item.category === "Art" ? "🖼️" : "🎁"}
                                </div>

                                {/* Badges */}
                                {item.badge && (
                                    <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badge === "Best Seller" ? "bg-[var(--color-warning)]/15 text-[var(--color-warning)] border border-[var(--color-warning)]/30" :
                                            item.badge === "New" ? "bg-[var(--color-success)]/15 text-[var(--color-success)] border border-[var(--color-success)]/30" :
                                                item.badge === "Limited" ? "bg-[var(--color-error)]/15 text-[var(--color-error)] border border-[var(--color-error)]/30" :
                                                    "bg-[var(--color-primary)]/15 text-[var(--color-primary-light)] border border-[var(--color-primary)]/30"
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}

                                {/* Like button */}
                                <button
                                    onClick={(e) => { e.preventDefault(); toggleLike(item.id); }}
                                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-[var(--bg-primary)]/60 backdrop-blur-sm border border-[var(--border-default)] hover:bg-[var(--bg-surface)] transition-colors"
                                >
                                    <Heart
                                        size={14}
                                        className={liked.has(item.id) ? "text-[var(--color-error)] fill-[var(--color-error)]" : "text-[var(--text-muted)]"}
                                    />
                                </button>

                                {/* Color swatches */}
                                {item.colors.length > 0 && (
                                    <div className="absolute bottom-3 left-3 flex gap-1">
                                        {item.colors.map((color, ci) => (
                                            <span
                                                key={ci}
                                                className="w-4 h-4 rounded-full border border-white/20"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-center gap-1 mb-1">
                                    <Star size={10} className="text-[var(--color-warning)]" fill="var(--color-warning)" />
                                    <span className="text-[10px] text-[var(--text-secondary)] font-medium">{item.rating}</span>
                                    <span className="text-[10px] text-[var(--text-muted)]">({item.reviews})</span>
                                </div>

                                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors mb-1">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-[var(--text-tertiary)] mb-3 flex-1">{item.description}</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-[var(--text-primary)]">
                                        ${item.price.toFixed(2)}
                                    </span>
                                    <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-xs font-semibold transition-all shadow-md shadow-[var(--color-primary)]/20">
                                        <ShoppingBag size={12} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </article>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
