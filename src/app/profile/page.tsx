"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bookmark, MessageCircle, Settings, User } from "lucide-react";
import { useSavedTools } from "@/hooks/useSavedTools";
import { ToolCard } from "@/components/tools/ToolCard";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"saved" | "reviews" | "settings">("saved");

    const { savedTools, isLoading: loadingSaved } = useSavedTools();

    // Redirect to login if unauthenticated
    if (status === "unauthenticated") {
        router.push("/login?callbackUrl=/profile");
        return null;
    }

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center py-32">
                <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="px-4 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Header Section */}
                <div className="clay-card p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt={session.user.name || "Avatar"} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            session?.user?.name?.charAt(0) || "U"
                        )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-1">
                            {session?.user?.name}
                        </h1>
                        <p className="text-[var(--text-secondary)] mb-4">{session?.user?.email}</p>

                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-plus)] text-sm font-medium text-[var(--text-secondary)] border border-[var(--border-default)]">
                                <Bookmark size={14} className="text-[var(--color-primary)]" />
                                {savedTools.length} Saved
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-plus)] text-sm font-medium text-[var(--text-secondary)] border border-[var(--border-default)]">
                                <MessageCircle size={14} className="text-[var(--color-accent)]" />
                                0 Reviews
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 border-b border-[var(--border-default)]">
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "saved"
                                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        <Bookmark size={16} /> Saved Tools
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "reviews"
                                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        <MessageCircle size={16} /> My Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${activeTab === "settings"
                                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        <Settings size={16} /> Settings
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "saved" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Your Collection</h2>
                        </div>
                        {loadingSaved ? (
                            <div className="flex justify-center py-12">
                                <div className="w-8 h-8 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin" />
                            </div>
                        ) : savedTools.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedTools.map((tool: any, index: number) => (
                                    <ToolCard key={tool.id} tool={tool} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="clay-card p-12 text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface-plus)] flex items-center justify-center text-[var(--text-muted)] mb-4">
                                    <Bookmark size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No saved tools yet</h3>
                                <p className="text-[var(--text-secondary)] mb-6 max-w-sm">
                                    Start building your AI stack by saving the tools you use or want to try.
                                </p>
                                <Link
                                    href="/"
                                    className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-medium transition-colors"
                                >
                                    Explore Tools
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="clay-card p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-[var(--bg-surface-plus)] flex items-center justify-center text-[var(--text-muted)] mb-4">
                            <MessageCircle size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No reviews written</h3>
                        <p className="text-[var(--text-secondary)] max-w-sm">
                            Help others discover the best AI tools by sharing your experiences and writing reviews.
                        </p>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="clay-card p-6 md:p-8">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Account Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={session?.user?.name || ""}
                                        className="w-full px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--text-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue={session?.user?.email || ""}
                                        disabled
                                        className="w-full px-4 py-2 bg-[var(--bg-surface-plus)] opacity-70 border border-[var(--border-default)] rounded-xl outline-none text-[var(--text-muted)] cursor-not-allowed"
                                    />
                                </div>
                                <div className="pt-4 border-t border-[var(--border-default)]">
                                    <button className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-light)] transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
