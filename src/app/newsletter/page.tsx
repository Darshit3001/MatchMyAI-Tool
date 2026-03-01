"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Sparkles, TrendingUp, Zap, Gift, ArrowRight } from "lucide-react";

const pastIssues = [
    { id: 1, title: "Top 10 AI Tools That Changed the Game in 2025", date: "Feb 25, 2026", emoji: "🏆" },
    { id: 2, title: "Free AI Tools You're Missing Out On", date: "Feb 18, 2026", emoji: "🆓" },
    { id: 3, title: "AI for Developers: Code Faster, Ship Smarter", date: "Feb 11, 2026", emoji: "💻" },
    { id: 4, title: "The Rise of Video AI: Sora vs Runway vs Pika", date: "Feb 4, 2026", emoji: "🎬" },
    { id: 5, title: "AI Design Tools That Will Replace Photoshop?", date: "Jan 28, 2026", emoji: "🎨" },
];

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSubscribed(true);
    };

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8 max-w-3xl mx-auto">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-12 pb-8 text-center"
            >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[var(--color-primary)]/25">
                    <Mail size={32} className="text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3">
                    The <span className="text-gradient">APT AI</span> Newsletter
                </h1>
                <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto mb-2">
                    Get the latest AI tools, exclusive deals, and expert insights delivered to your inbox every week.
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                    Join 25,000+ AI enthusiasts · Free forever · Unsubscribe anytime
                </p>
            </motion.div>

            {/* Subscribe form */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {!subscribed ? (
                    <form onSubmit={handleSubscribe} className="clay-card p-6 mb-8" style={{ cursor: "default" }}>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@email.com"
                                className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-surface-plus)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-sm transition-all shadow-lg shadow-[var(--color-primary)]/25 flex items-center justify-center gap-2 shrink-0"
                            >
                                Subscribe <ArrowRight size={14} />
                            </button>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] mt-2 text-center">
                            No spam. No ads. Just pure AI tool discovery.
                        </p>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="clay-card p-8 mb-8 text-center"
                        style={{ cursor: "default" }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-3 border border-[var(--color-success)]/20">
                            <CheckCircle2 size={28} className="text-[var(--color-success)]" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">You&apos;re in! 🎉</h3>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            Welcome to the APT AI community. Check your inbox for a welcome email.
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* What you get */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 text-center">What you&apos;ll get</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { icon: Sparkles, color: "var(--color-primary)", title: "Weekly Top Picks", desc: "Curated selection of the best new AI tools" },
                        { icon: TrendingUp, color: "var(--color-success)", title: "Trend Reports", desc: "What's hot in AI and where the industry is heading" },
                        { icon: Gift, color: "var(--color-warning)", title: "Exclusive Deals", desc: "Subscriber-only discounts on premium tools" },
                        { icon: Zap, color: "var(--color-accent)", title: "Early Access", desc: "Be the first to know about new tool launches" },
                    ].map((item) => (
                        <div key={item.title} className="clay-card p-4 flex items-start gap-3" style={{ cursor: "default" }}>
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                            >
                                <item.icon size={18} style={{ color: item.color }} />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h4>
                                <p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Past issues */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 text-center">Past Issues</h2>
                <div className="space-y-2">
                    {pastIssues.map((issue) => (
                        <div
                            key={issue.id}
                            className="clay-card p-4 flex items-center gap-3 group"
                        >
                            <span className="text-xl">{issue.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors truncate">
                                    {issue.title}
                                </h4>
                                <p className="text-[10px] text-[var(--text-muted)]">{issue.date}</p>
                            </div>
                            <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
