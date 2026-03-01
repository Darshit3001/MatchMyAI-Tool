"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { categories, getToolsByCategory, tools as allTools } from "@/data/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: slug } = use(params);
    const category = categories.find((c) => c.slug === slug);

    // For generic category pages like "personal", "work", etc., show all tools
    const isGenericCategory = ["personal", "work", "creativity", "random"].includes(slug);
    const toolsForCategory = isGenericCategory ? allTools : getToolsByCategory(slug);

    const displayName = isGenericCategory
        ? slug.charAt(0).toUpperCase() + slug.slice(1)
        : category?.name || slug;

    const displayIcon = category?.icon || (
        slug === "personal" ? "😊" :
            slug === "work" ? "💼" :
                slug === "creativity" ? "🎨" :
                    slug === "random" ? "🎲" : "📂"
    );

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            {/* Breadcrumb */}
            <div className="pt-4 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Link href="/" className="hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1">
                    <ArrowLeft size={12} /> Home
                </Link>
                <ChevronRight size={12} />
                <Link href="/categories" className="hover:text-[var(--text-secondary)] transition-colors">
                    Categories
                </Link>
                <ChevronRight size={12} />
                <span className="text-[var(--text-secondary)]">{displayName}</span>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 pb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] flex items-center justify-center text-2xl border border-[var(--border-default)]">
                        {displayIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                            {displayName}
                        </h1>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            {category?.description || `AI tools for ${displayName.toLowerCase()} tasks`} · {toolsForCategory.length} tools
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Tools */}
            <ToolGrid tools={toolsForCategory} />
        </div>
    );
}
