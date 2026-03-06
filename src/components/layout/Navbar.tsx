"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useFilterStore } from "@/stores/filterStore";
import { useUIStore } from "@/stores/uiStore";
import { Search, Zap, LogOut, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const navTabs = [
    { label: "Personal", emoji: "😊", href: "/categories/personal" },
    { label: "Work", emoji: "💼", href: "/categories/work" },
    { label: "Creativity", emoji: "🎨", href: "/categories/creativity" },
    { label: "Random", emoji: "🎲", href: "/categories/random" },
    { label: "Deals", emoji: "🏷️", href: "/deals" },
];

export function Navbar() {
    const { freeMode, toggleFreeMode } = useFilterStore();
    const { setSearchOpen } = useUIStore();
    const { data: session, status } = useSession();

    // Scroll interaction for the floating pill
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 20);
        });
        return () => unsubscribe();
    }, [scrollY]);

    // Animations based on scroll depth
    const navWidth = useTransform(scrollY, [0, 100], ["100%", "92%"]);
    const navY = useTransform(scrollY, [0, 100], [0, 16]);
    const navBorderRadius = useTransform(scrollY, [0, 100], ["0px", "9999px"]);

    return (
        <motion.header
            style={{ width: navWidth, y: navY, borderRadius: navBorderRadius }}
            className={`sticky top-0 z-[60] mx-auto transition-colors duration-500 will-change-transform will-change-[backdrop-filter,background,border-color]
            ${isScrolled
                    ? "bg-[#030308]/60 backdrop-blur-3xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                    : "bg-transparent border-b border-white/5 backdrop-blur-md"
                }`}
        >
            <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14 px-4 lg:px-6" : "h-16 px-6 lg:px-8"}`}>

                {/* Left section: Free Mode + Category Tabs */}
                <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar mask-linear-fade-right">
                    {/* Free Mode Toggle */}
                    <button
                        onClick={toggleFreeMode}
                        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 shrink-0 border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[var(--color-free)]
                        ${freeMode
                                ? "border-[var(--color-free)]/50 bg-[var(--color-free)]/10 text-[var(--color-free)] shadow-[0_0_15px_rgba(255,176,106,0.3)]"
                                : "border-white/5 text-white/50 hover:text-white hover:bg-white/5 hover:border-white/10"
                            }`}
                        aria-pressed={freeMode}
                        aria-label="Toggle Free Tools Only mode"
                    >
                        <Zap size={14} className={freeMode ? "fill-current" : ""} />
                        <span className="hidden sm:inline">Free Node</span>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-5 bg-white/10 shrink-0 hidden sm:block rounded-full" />

                    {/* Category Tabs */}
                    <div className="flex items-center gap-1">
                        {navTabs.map((tab) => (
                            <Link
                                key={tab.label}
                                href={tab.href}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 border border-transparent hover:border-white/5"
                            >
                                <span>{tab.emoji}</span>
                                <span className="hidden md:inline">{tab.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right section: Search + Auth */}
                <div className="flex items-center gap-3 lg:gap-4 shrink-0">

                    {/* Search Neural Trigger */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="group relative flex items-center gap-2 pr-1.5 pl-3 py-1.5 rounded-full text-sm font-medium text-white/50 bg-black/40 border border-white/5 hover:border-[var(--color-primary)]/40 hover:text-white hover:bg-[var(--color-primary)]/10 transition-all duration-300 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                        aria-label="Open neural search"
                    >
                        <Search size={14} className="group-hover:text-[var(--color-primary-light)] transition-colors" />
                        <span className="hidden lg:inline mr-2">Neural Uplink...</span>
                        <div className="hidden lg:flex items-center gap-1 px-2 py-1 text-[10px] font-mono tracking-widest uppercase bg-white/5 rounded-full border border-white/5 text-white/30 group-hover:text-[var(--color-primary-light)] group-hover:border-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)]/20 transition-all">
                            <span>⌘</span>
                            <span>K</span>
                        </div>
                    </button>

                    <div className="w-px h-5 bg-white/10 shrink-0 hidden sm:block rounded-full" />

                    {status === "loading" ? (
                        <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 animate-pulse" />
                    ) : session?.user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/profile"
                                className="group flex items-center gap-2.5 px-2 py-1.5 pr-3 rounded-full hover:bg-white/5 hover:border border-white/10 border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                            >
                                <div className="relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 overflow-hidden shadow-inner group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] opacity-80 mix-blend-screen" />
                                    {session.user.image ? (
                                        <img src={session.user.image} alt="Avatar" className="relative z-10 w-[90%] h-[90%] rounded-full border border-black/50 object-cover" />
                                    ) : (
                                        <span className="relative z-10 text-xs text-black">{session.user.name?.charAt(0) || "U"}</span>
                                    )}
                                </div>
                                <span className="text-[13px] font-semibold text-white/80 group-hover:text-white hidden sm:block tracking-tight">
                                    {session.user.name?.split(" ")[0]}
                                </span>
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-[var(--color-error)] border border-transparent hover:border-[var(--color-error)]/30 hover:bg-[var(--color-error)]/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-error)]"
                                aria-label="Terminate Session"
                                title="Terminate Session"
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 sm:gap-2">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-[13px] font-semibold text-white/60 hover:text-white transition-colors hidden sm:block rounded-full hover:bg-white/5"
                            >
                                Connect
                            </Link>
                            <Link
                                href="/register"
                                className="group relative overflow-hidden px-5 py-2 text-[13px] font-bold rounded-full bg-white text-black transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white"
                            >
                                <span className="relative z-10">Initialize</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite] -translate-x-full" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}
