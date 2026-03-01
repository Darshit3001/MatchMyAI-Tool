"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                {/* 404 illustration */}
                <div className="relative mb-8">
                    <motion.div
                        className="text-[120px] font-bold text-gradient leading-none select-none"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        404
                    </motion.div>
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[var(--color-primary)]/5 blur-[40px]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface)] flex items-center justify-center mx-auto mb-4 border border-[var(--border-default)]">
                    <SearchX size={28} className="text-[var(--text-muted)]" />
                </div>

                <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    Page not found
                </h1>
                <p className="text-sm text-[var(--text-tertiary)] mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25"
                    >
                        <Home size={14} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-surface-plus)] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        Go Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
