"use client";

import { type Tool } from "@/types";
import { ToolCard, ToolCardSkeleton } from "./ToolCard";

interface ToolGridProps {
    tools: Tool[];
    loading?: boolean;
    skeletonCount?: number;
}

export function ToolGrid({ tools, loading = false, skeletonCount = 8 }: ToolGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <ToolCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (tools.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-2xl bg-[var(--bg-surface)] flex items-center justify-center text-3xl mb-4">
                    🔍
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    No tools found
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] max-w-sm">
                    Try adjusting your filters or search query to find what you&apos;re looking for.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
        </div>
    );
}
