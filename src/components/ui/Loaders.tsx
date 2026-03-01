"use client";

import { motion } from "framer-motion";

export function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="relative w-12 h-12 mx-auto mb-4">
                    {/* Outer ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner spinner */}
                    <motion.div
                        className="absolute inset-1 rounded-full border-2 border-transparent border-t-[var(--color-primary)]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Center dot */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                    </motion.div>
                </div>
                <motion.p
                    className="text-sm text-[var(--text-muted)]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
}

export function InlineLoader({ text = "Loading" }: { text?: string }) {
    return (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <motion.div
                className="flex gap-1"
                initial="start"
                animate="end"
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </motion.div>
            <span>{text}</span>
        </div>
    );
}

export function SkeletonLine({ width = "100%" }: { width?: string }) {
    return (
        <div
            className="h-3 rounded-lg skeleton"
            style={{ width }}
        />
    );
}

export function SkeletonCard() {
    return (
        <div className="clay-card p-5 space-y-3" style={{ cursor: "default" }}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl skeleton shrink-0" />
                <div className="flex-1 space-y-2">
                    <SkeletonLine width="60%" />
                    <SkeletonLine width="80%" />
                </div>
            </div>
            <SkeletonLine />
            <div className="flex gap-2 pt-1">
                <SkeletonLine width="30%" />
                <SkeletonLine width="25%" />
            </div>
        </div>
    );
}
