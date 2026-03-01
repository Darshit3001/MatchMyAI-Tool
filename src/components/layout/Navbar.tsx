"use client";

import Link from "next/link";
import { useFilterStore } from "@/stores/filterStore";
import { useUIStore } from "@/stores/uiStore";
import { Search, Zap, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

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

    return (
        <header className="sticky top-0 z-50 glass-strong border-b border-[var(--border-default)]">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Left section: Free Mode + Category Tabs */}
                <div className="flex items-center gap-1 lg:gap-3 overflow-x-auto no-scrollbar">
                    {/* Free Mode Toggle */}
                    <button
                        onClick={toggleFreeMode}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0 ${freeMode
                            ? "bg-[var(--color-free)] text-[var(--bg-primary)] shadow-md"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-plus)]"
                            }`}
                        id="free-mode-toggle"
                    >
                        <Zap size={14} />
                        <span className="hidden sm:inline">Free mode</span>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-[var(--border-default)] shrink-0 hidden sm:block" />

                    {/* Category Tabs */}
                    {navTabs.map((tab) => (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-plus)] transition-all duration-200 whitespace-nowrap shrink-0"
                        >
                            <span>{tab.emoji}</span>
                            <span className="hidden md:inline">{tab.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Right section: Search + Auth */}
                <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                    {/* Search Button */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-plus)] border border-[var(--border-default)] transition-all duration-200"
                        id="search-trigger"
                    >
                        <Search size={14} />
                        <span className="hidden lg:inline">Search</span>
                        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-[var(--bg-surface-plus)] rounded text-[var(--text-muted)] border border-[var(--border-default)]">
                            Ctrl+K
                        </kbd>
                    </button>

                    {status === "loading" ? (
                        <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-800 animate-pulse" />
                    ) : session?.user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[var(--bg-surface-plus)] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden shadow-sm">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        session.user.name?.charAt(0) || "U"
                                    )}
                                </div>
                                <span className="text-sm font-medium text-[var(--text-primary)] hidden sm:block">
                                    {session.user.name?.split(" ")[0]}
                                </span>
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors tooltip"
                                title="Sign out"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-1.5 text-sm font-semibold rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white transition-all duration-200 hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
                                id="signup-btn"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
