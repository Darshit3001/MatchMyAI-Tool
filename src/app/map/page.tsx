"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, tools as allTools } from "@/data/tools";
import { Map as MapIcon, ZoomIn, ZoomOut, Maximize2, X, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/types";

// Generate positions for category bubbles in a radial layout
function generateBubblePositions(count: number) {
    const positions: { x: number; y: number; size: number }[] = [];
    const centerX = 50;
    const centerY = 50;

    // Place items in concentric rings
    const rings = [
        { radius: 0, count: 1 },
        { radius: 18, count: Math.min(6, count - 1) },
        { radius: 32, count: Math.min(8, Math.max(0, count - 7)) },
        { radius: 44, count: Math.max(0, count - 15) },
    ];

    let placed = 0;
    rings.forEach((ring) => {
        for (let i = 0; i < ring.count && placed < count; i++) {
            const angle = (i / ring.count) * Math.PI * 2 - Math.PI / 2;
            const jitter = (Math.random() - 0.5) * 3;
            positions.push({
                x: centerX + Math.cos(angle) * ring.radius + jitter,
                y: centerY + Math.sin(angle) * ring.radius + jitter,
                size: ring.radius === 0 ? 14 : ring.radius < 25 ? 10 : 8,
            });
            placed++;
        }
    });

    return positions;
}

// Color palette for bubbles
const bubbleColors = [
    "#7C5CFC", "#00D4AA", "#FF6B6B", "#FFD93D", "#6BCB77",
    "#4D96FF", "#FF922B", "#845EC2", "#00C9A7", "#FF6F91",
    "#FFC75F", "#008E9B", "#D65DB1", "#0089BA", "#F9F871",
    "#FF9671", "#67B7D1", "#E8A0BF", "#B8E986", "#A0D2DB",
];

export default function MapPage() {
    const [zoom, setZoom] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const positions = useMemo(() => generateBubblePositions(categories.length), []);

    const selectedCatData = selectedCategory
        ? categories.find((c) => c.id === selectedCategory)
        : null;

    const selectedCatTools = selectedCategory
        ? allTools.filter(
            (t) => t.categoryId === selectedCategory || t.category.id === selectedCategory
        )
        : [];

    // Generate connection lines between related categories
    const connections = useMemo(() => {
        const lines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
        for (let i = 0; i < Math.min(positions.length, categories.length); i++) {
            for (let j = i + 1; j < Math.min(positions.length, categories.length); j++) {
                const dist = Math.sqrt(
                    Math.pow(positions[i].x - positions[j].x, 2) +
                    Math.pow(positions[i].y - positions[j].y, 2)
                );
                if (dist < 25) {
                    lines.push({
                        x1: positions[i].x,
                        y1: positions[i].y,
                        x2: positions[j].x,
                        y2: positions[j].y,
                        opacity: Math.max(0.05, 0.2 - dist * 0.008),
                    });
                }
            }
        }
        return lines;
    }, [positions]);

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8 h-[calc(100vh-64px)] flex flex-col">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 pb-4 flex items-center justify-between shrink-0"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20">
                        <MapIcon size={20} className="text-[var(--color-accent)]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[var(--text-primary)]">AI Tool Ecosystem</h1>
                        <p className="text-xs text-[var(--text-tertiary)]">
                            Interactive map of {categories.length} categories &amp; {allTools.length}+ tools
                        </p>
                    </div>
                </div>

                {/* Zoom controls */}
                <div className="flex items-center gap-1 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)] p-1">
                    <button
                        onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-plus)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                        <ZoomOut size={14} />
                    </button>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] w-10 text-center">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-plus)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                        <ZoomIn size={14} />
                    </button>
                    <button
                        onClick={() => setZoom(1)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-plus)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                        <Maximize2 size={14} />
                    </button>
                </div>
            </motion.div>

            {/* Map canvas */}
            <div className="flex-1 relative rounded-2xl bg-[var(--bg-surface)]/50 border border-[var(--border-default)] overflow-hidden">
                {/* Background grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "radial-gradient(circle, var(--text-muted) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }} />

                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none" />

                {/* SVG Canvas */}
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{ transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform 0.3s ease" }}
                >
                    {/* Connection lines */}
                    {connections.map((line, i) => (
                        <line
                            key={`line-${i}`}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="var(--color-primary)"
                            strokeWidth="0.08"
                            opacity={line.opacity}
                        />
                    ))}

                    {/* Category bubbles */}
                    {categories.map((cat, i) => {
                        if (i >= positions.length) return null;
                        const pos = positions[i];
                        const color = bubbleColors[i % bubbleColors.length];
                        const isHovered = hoveredCategory === cat.id;
                        const isSelected = selectedCategory === cat.id;
                        const scale = isHovered || isSelected ? 1.2 : 1;
                        const toolCount = cat.toolCount;
                        const sizeMultiplier = Math.max(0.6, Math.min(1.4, toolCount / 150));
                        const radius = (pos.size / 2) * sizeMultiplier;

                        return (
                            <g
                                key={cat.id}
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                                onMouseEnter={() => setHoveredCategory(cat.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                                style={{ transition: "transform 0.2s ease" }}
                            >
                                {/* Outer glow */}
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r={radius + 1}
                                    fill={color}
                                    opacity={isHovered || isSelected ? 0.15 : 0.05}
                                    style={{ transition: "opacity 0.2s ease" }}
                                />
                                {/* Main bubble */}
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r={radius * scale}
                                    fill={`${color}22`}
                                    stroke={color}
                                    strokeWidth={isSelected ? 0.3 : 0.15}
                                    opacity={isHovered || isSelected ? 1 : 0.7}
                                    style={{ transition: "all 0.2s ease" }}
                                />
                                {/* Icon */}
                                <text
                                    x={pos.x}
                                    y={pos.y - 0.5}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize={radius * 0.7}
                                    className="select-none pointer-events-none"
                                >
                                    {cat.icon}
                                </text>
                                {/* Label */}
                                <text
                                    x={pos.x}
                                    y={pos.y + radius + 1.8}
                                    textAnchor="middle"
                                    fontSize="1.5"
                                    fill="var(--text-secondary)"
                                    opacity={isHovered || isSelected ? 1 : 0.6}
                                    className="select-none pointer-events-none"
                                    style={{ transition: "opacity 0.2s ease" }}
                                >
                                    {cat.name}
                                </text>
                                {/* Count badge */}
                                <text
                                    x={pos.x}
                                    y={pos.y + radius + 3.3}
                                    textAnchor="middle"
                                    fontSize="1.1"
                                    fill="var(--text-muted)"
                                    opacity={isHovered || isSelected ? 0.8 : 0}
                                    className="select-none pointer-events-none"
                                    style={{ transition: "opacity 0.2s ease" }}
                                >
                                    {toolCount} tools
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Selected category detail panel */}
                <AnimatePresence>
                    {selectedCatData && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute top-4 right-4 w-72 max-h-[calc(100%-32px)] clay-card p-4 overflow-y-auto no-scrollbar z-10"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{selectedCatData.icon}</span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                                            {selectedCatData.name}
                                        </h3>
                                        <p className="text-[10px] text-[var(--text-muted)]">
                                            {selectedCatData.toolCount} tools
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="p-1 rounded-lg hover:bg-[var(--bg-surface-plus)] text-[var(--text-muted)]"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {selectedCatData.description && (
                                <p className="text-xs text-[var(--text-tertiary)] mb-3">
                                    {selectedCatData.description}
                                </p>
                            )}

                            <div className="space-y-2">
                                {selectedCatTools.slice(0, 5).map((tool) => (
                                    <Link
                                        key={tool.id}
                                        href={`/tool/${tool.slug}`}
                                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--bg-surface-plus)] transition-colors group"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-[10px] font-bold text-[var(--color-primary-light)] border border-[var(--border-default)] shrink-0">
                                            {tool.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--color-primary-light)]">
                                                {tool.name}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                                                <Star size={8} className="text-[var(--color-warning)]" fill="var(--color-warning)" />
                                                {tool.avgRating.toFixed(1)}
                                            </div>
                                        </div>
                                        <ExternalLink size={10} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 shrink-0" />
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href={`/categories/${selectedCatData.slug}`}
                                className="mt-3 flex items-center justify-center gap-1 w-full py-2 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-medium hover:bg-[var(--color-primary)]/20 transition-colors"
                            >
                                View all {selectedCatData.toolCount} tools
                                <ExternalLink size={10} />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" /> Larger = more tools
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-4 h-px bg-[var(--color-primary)]/30" /> Related categories
                    </span>
                </div>
            </div>
        </div>
    );
}
