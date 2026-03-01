"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useFilterStore } from "@/stores/filterStore";
import { useUIStore } from "@/stores/uiStore";
import { tools as allTools, categories, getLatestTools, getTrendingTools } from "@/data/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { FeedTabs } from "@/components/tools/FeedTabs";
import { Search, ArrowRight, Sparkles, BarChart3, Briefcase, Layers } from "lucide-react";
import Link from "next/link";

// Stats data
const stats = [
  { label: "AI Tools", value: "46,600+", icon: Layers, color: "var(--color-primary)" },
  { label: "Tasks", value: "11,300+", icon: Briefcase, color: "var(--color-accent)" },
  { label: "Categories", value: "200+", icon: BarChart3, color: "var(--color-warning)" },
];

// Featured categories for quick nav
const featuredCategories = categories.slice(0, 8);

export default function HomePage() {
  const { feedTab, freeMode } = useFilterStore();
  const { setSearchOpen } = useUIStore();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredTools = useMemo(() => {
    let result = feedTab === "trending" ? getTrendingTools(24) : getLatestTools(24);

    if (freeMode) {
      result = result.filter((t) => t.pricingModel === "FREE");
    }

    return result;
  }, [feedTab, freeMode]);

  return (
    <div className="pb-24 lg:pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[var(--color-primary)]/10 blur-[100px] blob-animate" />
          <div className="absolute -top-20 right-0 w-60 h-60 rounded-full bg-[var(--color-accent)]/8 blur-[80px] blob-animate" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative px-4 lg:px-8 pt-8 pb-6 lg:pt-12 lg:pb-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-3 font-[var(--font-display)]">
              <span className="text-gradient">APT AI</span>
            </h1>
            <p className="text-base lg:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              Discover the perfect AI tool for any task.
              <span className="text-[var(--text-primary)] font-medium"> Compare, review, and decide </span>
              with confidence.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xl mx-auto mb-8"
          >
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-all duration-300 group shadow-lg shadow-black/20"
              id="hero-search"
            >
              <Search size={18} className="text-[var(--text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
              <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-tertiary)] transition-colors flex-1 text-left">
                Search 46,600+ AI tools...
              </span>
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs bg-[var(--bg-surface-plus)] rounded-lg text-[var(--text-muted)] border border-[var(--border-default)]">
                Ctrl+K
              </kbd>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-6 lg:gap-10 mb-8"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <stat.icon size={16} style={{ color: stat.color }} />
                  <span className="text-xl lg:text-2xl font-bold text-[var(--text-primary)]">{stat.value}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-2"
          >
            {(showAllCategories ? categories : featuredCategories).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface-plus)] transition-all duration-200"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-[var(--text-muted)]">({cat.toolCount})</span>
              </Link>
            ))}
            {!showAllCategories && (
              <button
                onClick={() => setShowAllCategories(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-200"
              >
                Show all
                <ArrowRight size={12} />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="px-4 lg:px-8">
        {/* Feed header */}
        <div className="flex items-center justify-between mb-5">
          <FeedTabs />

          <div className="flex items-center gap-2">
            <Link
              href="/quiz"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-primary-light)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/15 transition-all duration-200"
            >
              <Sparkles size={12} />
              Find my tool
            </Link>
          </div>
        </div>

        {/* Free mode indicator */}
        {freeMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-free)]/10 border border-[var(--color-free)]/20 text-[var(--color-free)] text-xs font-medium">
              <Sparkles size={12} />
              Showing free tools only
            </div>
          </motion.div>
        )}

        {/* Tool Grid */}
        <ToolGrid tools={filteredTools} />
      </section>
    </div>
  );
}
