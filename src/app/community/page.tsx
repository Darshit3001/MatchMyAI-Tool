"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Trophy, Star, TrendingUp, Zap, Heart, Share2, Plus } from "lucide-react";
import Link from "next/link";

const featuredMembers = [
    { name: "Alex Chen", role: "AI Researcher", karma: 4820, reviews: 142, avatar: "A", badge: "🏆", joined: "Jan 2024" },
    { name: "Sarah Kim", role: "Product Designer", karma: 3650, reviews: 98, avatar: "S", badge: "⭐", joined: "Feb 2024" },
    { name: "Marcus Lee", role: "Developer", karma: 3120, reviews: 87, avatar: "M", badge: "🔥", joined: "Jan 2024" },
    { name: "Priya Patel", role: "Content Creator", karma: 2890, reviews: 75, avatar: "P", badge: "💡", joined: "Mar 2024" },
    { name: "James Wright", role: "Data Scientist", karma: 2410, reviews: 63, avatar: "J", badge: "🎯", joined: "Feb 2024" },
    { name: "Darshit Sheth", role: "Founder", karma: 1900, reviews: 50, avatar: "D", badge: "🚀", joined: "Mar 2024" },
];

const recentDiscussions = [
    {
        id: "1", title: "What's the best AI tool for generating realistic product images?",
        author: "Alex Chen", replies: 24, upvotes: 87, time: "2h ago", tag: "Image Generation",
    },
    {
        id: "2", title: "Claude vs ChatGPT for coding tasks — which do you prefer?",
        author: "Marcus Lee", replies: 41, upvotes: 134, time: "4h ago", tag: "Chatbots",
    },
    {
        id: "3", title: "Hidden gems: AI tools that deserve more attention",
        author: "Sarah Kim", replies: 19, upvotes: 62, time: "6h ago", tag: "General",
    },
    {
        id: "4", title: "How are you all using AI in your daily workflows?",
        author: "Priya Patel", replies: 58, upvotes: 210, time: "1d ago", tag: "Productivity",
    },
    {
        id: "5", title: "Tips for getting the best results from Midjourney v6",
        author: "James Wright", replies: 33, upvotes: 95, time: "1d ago", tag: "Image Generation",
    },
];

const stats = [
    { label: "Community Members", value: "12,400+", icon: Users, color: "text-violet-400" },
    { label: "Reviews Written", value: "48,200+", icon: Star, color: "text-yellow-400" },
    { label: "Discussions", value: "3,800+", icon: MessageCircle, color: "text-blue-400" },
    { label: "Tools Discovered", value: "46,600+", icon: Zap, color: "text-emerald-400" },
];

const tagColors: Record<string, string> = {
    "Image Generation": "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Chatbots": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "General": "bg-violet-500/10 text-violet-400 border-violet-500/20",
    "Productivity": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function CommunityPage() {
    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                            <Users size={24} className="text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">Community</h1>
                            <p className="text-sm text-[var(--text-tertiary)]">
                                Connect, discuss, and discover AI with fellow enthusiasts
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25">
                        <Plus size={14} />
                        New Discussion
                    </button>
                </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="clay-card p-4 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-plus)] flex items-center justify-center border border-[var(--border-default)]">
                            <stat.icon size={18} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</p>
                            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Discussions — left 2/3 */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                            <TrendingUp size={16} className="text-[var(--color-primary-light)]" />
                            Hot Discussions
                        </h2>
                        <button className="text-xs text-[var(--color-primary-light)] hover:underline">View all</button>
                    </div>

                    {recentDiscussions.map((disc, i) => (
                        <motion.div
                            key={disc.id}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.06 * i }}
                        >
                            <div className="clay-card p-4 group cursor-pointer hover:border-[var(--color-primary)]/30 transition-all">
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                        {disc.author.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span
                                                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tagColors[disc.tag] ?? "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-default)]"}`}
                                            >
                                                {disc.tag}
                                            </span>
                                            <span className="text-xs text-[var(--text-muted)]">{disc.time}</span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors leading-snug mb-2">
                                            {disc.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                            <span className="font-medium text-[var(--text-tertiary)]">{disc.author}</span>
                                            <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                                                <Heart size={12} />
                                                {disc.upvotes}
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                                <MessageCircle size={12} />
                                                {disc.replies} replies
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-[var(--color-primary-light)] transition-colors ml-auto">
                                                <Share2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Leaderboard sidebar — right 1/3 */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                            <Trophy size={16} className="text-yellow-400" />
                            Top Contributors
                        </h2>
                        <Link href="/leaderboard" className="text-xs text-[var(--color-primary-light)] hover:underline">
                            Full leaderboard
                        </Link>
                    </div>

                    <div className="clay-card divide-y divide-[var(--border-default)]">
                        {featuredMembers.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.07 * i }}
                                className="flex items-center gap-3 p-3 hover:bg-[var(--bg-surface-plus)] transition-colors"
                            >
                                {/* Rank */}
                                <span className="text-xs font-bold text-[var(--text-muted)] w-4 flex-shrink-0">
                                    {i + 1}
                                </span>
                                {/* Avatar */}
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {member.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-semibold text-[var(--text-primary)] truncate">
                                            {member.name}
                                        </span>
                                        <span className="text-xs">{member.badge}</span>
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)] truncate">{member.role}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-bold text-[var(--color-primary-light)]">
                                        {member.karma.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-[var(--text-muted)]">karma</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Join CTA */}
                    <div className="clay-card p-5 text-center border border-[var(--color-primary)]/20">
                        <div className="text-2xl mb-2">🌟</div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                            Join the Community
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mb-3">
                            Share reviews, earn karma, and help others find the right AI tools.
                        </p>
                        <Link
                            href="/register"
                            className="block w-full py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-semibold transition-all text-center"
                        >
                            Sign Up Free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
