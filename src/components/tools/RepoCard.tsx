"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Star, ArrowUpRight, Github } from "lucide-react";

interface RepoProps {
    repo: {
        id: number; name: string; fullName: string; description: string; url: string; stars: number; language: string; ownerAvatar: string; ownerName: string; topics: string[];
    };
    index: number;
}

export function RepoCard({ repo, index }: RepoProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, 0]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, 0]);

    const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
        if (!ref.current || prefersReducedMotion) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePointerLeave = () => { if (prefersReducedMotion) return; x.set(0); y.set(0); };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="h-full"
        >
            <motion.a
                ref={ref}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onFocus={() => { x.set(0); y.set(0.1); }}
                onBlur={handlePointerLeave}
                style={{
                    rotateX: prefersReducedMotion ? 0 : rotateX,
                    rotateY: prefersReducedMotion ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="group relative block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-[24px]"
                aria-label={`View GitHub repository for ${repo.name}. Language: ${repo.language}. Stars: ${repo.stars}.`}
            >
                <article className="h-full p-6 flex flex-col gap-4 relative overflow-hidden rounded-[24px] bg-[var(--bg-surface)] backdrop-blur-2xl border border-[var(--border-default)] transition-all duration-300 hover:border-[#0A66C2]/40 focus-visible:border-[#0A66C2]/40">

                    {!prefersReducedMotion && (
                        <motion.div
                            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[24px]"
                            style={{
                                background: useTransform(
                                    [glareX, glareY],
                                    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(10, 102, 194, 0.15) 0%, transparent 60%)`
                                ) as any
                            }}
                        />
                    )}

                    <div className="relative z-10 flex flex-col h-full pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img src={repo.ownerAvatar} alt="" className="w-10 h-10 rounded-full border border-[var(--border-default)] bg-black shadow-inner object-cover" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-mono">{repo.ownerName}</p>
                                    <h3 className="font-bold text-lg text-white leading-tight transition-colors group-hover:text-[#0A66C2] group-focus-visible:text-[#0A66C2]">{repo.name}</h3>
                                </div>
                            </div>

                            {/* Pulsing Star Badge on Hover */}
                            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-mono text-amber-400 group-hover:border-amber-400/30 group-hover:bg-amber-400/10 transition-colors">
                                <motion.div animate={!prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center">
                                    <Star size={12} className="fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                                </motion.div>
                                <span className="ml-1">{repo.stars >= 1000 ? (repo.stars / 1000).toFixed(1) + 'k' : repo.stars}</span>
                            </div>
                        </div>

                        <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-grow">
                            {repo.description}
                        </p>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent my-4 opacity-50" />

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                                {repo.language && (
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                                        <span className="w-2 h-2 rounded-full bg-[#0A66C2] shadow-[0_0_8px_rgba(10,102,194,0.8)]" />
                                        {repo.language}
                                    </div>
                                )}
                            </div>

                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:text-white transition-all transform group-hover:scale-110 shadow-[0_0_15px_rgba(10,102,194,0)] group-hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] pointer-events-auto">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </div>
                </article>
            </motion.a>
        </motion.div>
    );
}
