"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="relative w-14 h-14 mx-auto mb-4">
                    {/* Outer ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Spinner */}
                    <motion.div
                        className="absolute inset-1 rounded-full border-2 border-transparent border-t-[var(--color-primary)] border-r-[var(--color-accent)]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Center dot */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
                    </motion.div>
                </div>
                <motion.p
                    className="text-sm text-[var(--text-muted)] font-medium"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
}
