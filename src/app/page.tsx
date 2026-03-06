"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useFilterStore } from "@/stores/filterStore";
import { useUIStore } from "@/stores/uiStore";
import { tools as allTools, categories, getLatestTools, getTrendingTools } from "@/data/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { FeedTabs } from "@/components/tools/FeedTabs";
import { Search, ArrowRight, Sparkles, BarChart3, Briefcase, Layers, Zap, Send, Map as MapIcon, X, Clock } from "lucide-react";
import Link from "next/link";

// Stats data
const stats = [
  { label: "AI Tools", value: "46,600+", icon: Layers, color: "var(--color-primary)" },
  { label: "Tasks", value: "11,300+", icon: Briefcase, color: "var(--color-accent)" },
  { label: "Categories", value: "200+", icon: BarChart3, color: "var(--color-warning)" },
];

const featuredCategories = categories.slice(0, 8);

const sparkles = [
  { left: "10%", top: "20%", delay: 0, duration: 4 },
  { left: "25%", top: "60%", delay: 1.2, duration: 5 },
  { left: "40%", top: "15%", delay: 2.4, duration: 3.5 },
  { left: "55%", top: "70%", delay: 0.8, duration: 4.5 },
  { left: "70%", top: "25%", delay: 3.2, duration: 5.5 },
  { left: "85%", top: "50%", delay: 1.8, duration: 4 },
  { left: "15%", top: "80%", delay: 2.8, duration: 3 },
  { left: "60%", top: "40%", delay: 0.4, duration: 5 },
  { left: "90%", top: "15%", delay: 3.6, duration: 4.5 },
  { left: "35%", top: "85%", delay: 1.5, duration: 3.5 },
  { left: "78%", top: "75%", delay: 2.1, duration: 4.2 },
  { left: "48%", top: "35%", delay: 3.8, duration: 5.2 },
];

export default function HomePage() {
  const { feedTab, freeMode, timelineFilter, setTimelineFilter } = useFilterStore();
  const { setSearchOpen } = useUIStore();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredTools = useMemo(() => {
    let result = feedTab === "trending" ? getTrendingTools(60) : getLatestTools(60);

    // Timeline filter
    if (timelineFilter) {
      result = result.filter((t) => {
        const date = new Date(t.createdAt);
        const year = date.getFullYear().toString();
        const monthYear = `${date.toLocaleString("en", { month: "short" }).toLowerCase()}-${date.getFullYear()}`;
        return year === timelineFilter || monthYear === timelineFilter;
      });
    }

    if (freeMode) result = result.filter((t) => t.pricingModel === "FREE");
    return result;
  }, [feedTab, freeMode, timelineFilter]);

  return (
    <div className="pb-24 lg:pb-8">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(420px, 60vh, 600px)" }}>
        <div className="liquid-mesh-bg"><span /></div>

        {sparkles.map((s, i) => (
          <div key={i} className="sparkle" style={{
            left: s.left, top: s.top,
            animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            width: i % 3 === 0 ? "4px" : i % 2 === 0 ? "2px" : "3px",
            height: i % 3 === 0 ? "4px" : i % 2 === 0 ? "2px" : "3px",
          }} />
        ))}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
          <div className="w-[600px] h-[350px] rounded-full blur-[130px] opacity-50"
            style={{ background: "radial-gradient(ellipse, rgba(108,92,231,0.6), rgba(0,210,255,0.25), transparent)" }} />
        </div>

        <div className="relative px-4 lg:px-8 pt-10 pb-8 lg:pt-16 lg:pb-10 flex flex-col items-center" style={{ zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[var(--font-display)] tracking-tight leading-[1.1] mb-4">
              <span className="text-gradient text-glow">MatchMyAI Tool</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-light">
              Discover the perfect AI tool for any task.
              <br className="hidden sm:block" />
              <span className="text-[var(--text-primary)] font-medium"> Compare, review, and decide </span>with confidence.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl mb-8">
            <button onClick={() => setSearchOpen(true)}
              className="liquid-search glass-shimmer glow-pulse-border w-full flex items-center gap-3 px-6 py-4 group cursor-pointer" id="hero-search">
              <Search size={20} className="text-[var(--text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-300" />
              <span className="text-sm sm:text-base text-[var(--text-muted)] group-hover:text-[var(--text-tertiary)] transition-colors duration-300 flex-1 text-left">
                Search 46,600+ AI tools...
              </span>
              <kbd className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs bg-white/[0.04] rounded-lg text-[var(--text-muted)] border border-white/[0.06]">
                Ctrl+K
              </kbd>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-3 mb-10">
            <Link href="/categories" className="liquid-btn px-6 py-2.5 text-sm font-semibold text-white flex items-center gap-2">
              <Zap size={15} />Explore Tools
            </Link>
            <Link href="/submit" className="liquid-btn-ghost px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2">
              <Send size={14} />Submit a Tool
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-3 sm:gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }} className="liquid-glass-thin px-4 py-2.5 flex items-center gap-2 rounded-2xl">
                <stat.icon size={15} style={{ color: stat.color }} />
                <span className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-xs text-[var(--text-muted)] hidden sm:inline">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap items-center justify-center gap-2">
            {(showAllCategories ? categories : featuredCategories).map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/[0.12] hover:bg-white/[0.06] backdrop-blur-sm transition-all duration-300">
                <span>{cat.icon}</span><span>{cat.name}</span>
                <span className="text-[var(--text-muted)]">({cat.toolCount})</span>
              </Link>
            ))}
            {!showAllCategories && (
              <button onClick={() => setShowAllCategories(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all duration-200">
                Show all<ArrowRight size={12} />
              </button>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg-primary))", zIndex: 3 }} />
      </section>

      {/* ════════════════════════════════════════════════════════
          CATEGORY RIVER — Auto-scrolling ticker + CTA
      ════════════════════════════════════════════════════════ */}
      <section className="mb-16 relative z-10 overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0D0D1A] via-[#07070F] to-[#0A0A0F] border-y border-white/[0.04] py-14">
          {/* Ambient glows */}
          <div className="absolute top-0 left-[-10%] w-[500px] h-[300px] rounded-full bg-[var(--color-primary)]/8 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-[-5%] w-[400px] h-[250px] rounded-full bg-[var(--color-accent)]/6 blur-[120px] pointer-events-none" />

          <div className="relative px-4 lg:px-8">
            {/* Heading row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-[var(--color-accent)]/60 mb-3">◈ AI Ecosystem Explorer</p>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                  Every AI category,{" "}
                  <span className="bg-gradient-to-r from-[var(--color-primary-light)] via-white to-[var(--color-accent)] bg-clip-text text-transparent">
                    one place.
                  </span>
                </h2>
                <p className="mt-3 text-sm text-white/40 max-w-md">
                  Browse {categories.length}+ sectors — writing, imaging, coding, research, and beyond.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  {[
                    { v: `${categories.length}+`, l: "Categories" },
                    { v: "46k+", l: "AI Tools" },
                  ].map((s) => (
                    <div key={s.l} className="text-center px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-lg font-bold text-white">{s.v}</p>
                      <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">{s.l}</p>
                    </div>
                  ))}
                </div>
                <Link href="/map"
                  className="group flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm text-black bg-white hover:bg-[var(--color-primary-light)] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
                  <MapIcon size={15} />
                  Open Explorer
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Auto-scrolling ribbon */}
            <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
              <motion.div
                className="flex gap-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[...categories, ...categories].map((cat, i) => (
                  <Link key={`${cat.id}-${i}`} href={`/categories/${cat.slug}`}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.14] transition-all whitespace-nowrap shrink-0">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{cat.name}</span>
                    <span className="text-[11px] font-mono text-white/25 group-hover:text-white/50 transition-colors">{cat.toolCount}</span>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          LIVE FEED
      ════════════════════════════════════════════════════════ */}
      <section className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <FeedTabs />
          <div className="flex items-center gap-2">
            <Link href="/quiz"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-primary-light)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/15 transition-all duration-200">
              <Sparkles size={12} />Find my tool
            </Link>
          </div>
        </div>

        {freeMode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="mb-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-free)]/10 border border-[var(--color-free)]/20 text-[var(--color-free)] text-xs font-medium">
              <Sparkles size={12} />Showing free tools only
            </div>
          </motion.div>
        )}

        {timelineFilter && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="mb-4">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-medium">
              <span className="flex items-center gap-2"><Clock size={12} />Showing tools from: <strong>{timelineFilter.toUpperCase()}</strong></span>
              <button onClick={() => setTimelineFilter(null)} className="p-0.5 hover:bg-white/10 rounded transition-colors">
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}

        <ToolGrid tools={filteredTools} />
      </section>
    </div>
  );
}
