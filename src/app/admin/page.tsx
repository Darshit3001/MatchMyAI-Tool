"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Wrench,
    Users,
    BarChart3,
    FileText,
    Star,
    Eye,
    Bookmark,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    Shield,
    TrendingUp,
    Clock,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type Tab = "overview" | "tools" | "submissions";

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [toolSearch, setToolSearch] = useState("");
    const [toolPage, setToolPage] = useState(1);

    // Fetch admin stats
    const { data: statsData, isLoading: loadingStats } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await fetch("/api/admin/stats");
            if (!res.ok) {
                const data = await res.json();
                return data; // Return error response instead of throwing
            }
            return res.json();
        },
        enabled: status === "authenticated",
    });

    // Fetch tools list
    const { data: toolsData, isLoading: loadingTools } = useQuery({
        queryKey: ["admin-tools", toolPage, toolSearch],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: toolPage.toString(),
                limit: "15",
                ...(toolSearch && { search: toolSearch }),
            });
            const res = await fetch(`/api/admin/tools?${params}`);
            if (!res.ok) throw new Error("Failed to fetch tools");
            return res.json();
        },
        enabled: status === "authenticated" && activeTab === "tools",
    });

    // Delete tool mutation
    const deleteTool = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/admin/tools/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tools"] });
            queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        },
    });

    // Toggle tool published status
    const togglePublished = useMutation({
        mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
            const res = await fetch(`/api/admin/tools/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublished }),
            });
            if (!res.ok) throw new Error("Failed to update");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-tools"] });
        },
    });

    // All hooks have been called above — safe to do conditional returns now

    // Redirect non-admins
    if (status === "unauthenticated") {
        router.push("/login?callbackUrl=/admin");
        return null;
    }

    if (status === "loading" || loadingStats) {
        return (
            <div className="flex justify-center items-center py-32">
                <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Check admin role
    if (statsData?.error) {
        return (
            <div className="flex flex-col justify-center items-center py-32 text-center">
                <Shield size={48} className="text-[var(--color-error)] mb-4" />
                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Access Denied</h1>
                <p className="text-[var(--text-secondary)]">You need administrator privileges to access this page.</p>
            </div>
        );
    }

    const stats = statsData?.stats;

    const statCards = [
        { label: "Total Tools", value: stats?.tools || 0, icon: Wrench, color: "var(--color-primary)" },
        { label: "Total Users", value: stats?.users || 0, icon: Users, color: "var(--color-accent)" },
        { label: "Categories", value: stats?.categories || 0, icon: BarChart3, color: "var(--color-success)" },
        { label: "Reviews", value: stats?.reviews || 0, icon: Star, color: "var(--color-warning)" },
        { label: "Pending", value: stats?.pendingSubmissions || 0, icon: FileText, color: "var(--color-error)" },
    ];

    const tabs = [
        { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
        { id: "tools" as Tab, label: "Tools", icon: Wrench },
        { id: "submissions" as Tab, label: "Submissions", icon: FileText },
    ];

    return (
        <div className="px-4 lg:px-8 py-6 lg:py-10 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] flex items-center gap-3">
                            <Shield size={28} className="text-[var(--color-primary)]" />
                            Admin Dashboard
                        </h1>
                        <p className="text-[var(--text-secondary)] mt-1">Manage tools, users, and submissions</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-8 border-b border-[var(--border-default)]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-all ${activeTab === tab.id
                                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ==================== OVERVIEW TAB ==================== */}
                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {statCards.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="clay-card p-5 text-center"
                                    style={{ cursor: "default" }}
                                >
                                    <stat.icon size={24} style={{ color: stat.color }} className="mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                                    <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Two-column: Recent Tools + Recent Users */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Tools */}
                            <div className="clay-card p-5" style={{ cursor: "default" }}>
                                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                    <TrendingUp size={14} className="text-[var(--color-primary)]" />
                                    Recent Tools
                                </h3>
                                <div className="space-y-3">
                                    {statsData?.recentTools?.map((tool: any) => (
                                        <div key={tool.id} className="flex items-center justify-between py-2 border-b border-[var(--border-default)] last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-xs font-bold text-[var(--color-primary-light)] border border-[var(--border-default)]">
                                                    {tool.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-[var(--text-primary)]">{tool.name}</div>
                                                    <div className="text-[10px] text-[var(--text-muted)]">{tool.category?.name}</div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(tool.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Users */}
                            <div className="clay-card p-5" style={{ cursor: "default" }}>
                                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                    <Users size={14} className="text-[var(--color-accent)]" />
                                    Recent Users
                                </h3>
                                <div className="space-y-3">
                                    {statsData?.recentUsers?.map((user: any) => (
                                        <div key={user.id} className="flex items-center justify-between py-2 border-b border-[var(--border-default)] last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-[var(--text-primary)]">{user.name}</div>
                                                    <div className="text-[10px] text-[var(--text-muted)]">{user.email}</div>
                                                </div>
                                            </div>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${user.role === "admin"
                                                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                                : "bg-[var(--bg-surface-plus)] text-[var(--text-muted)]"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== TOOLS TAB ==================== */}
                {activeTab === "tools" && (
                    <div className="space-y-6">
                        {/* Search Bar */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Search tools..."
                                    value={toolSearch}
                                    onChange={(e) => { setToolSearch(e.target.value); setToolPage(1); }}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--text-primary)] text-sm"
                                />
                            </div>
                        </div>

                        {/* Tools Table */}
                        <div className="clay-card overflow-hidden" style={{ cursor: "default" }}>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface-plus)]/50">
                                            <th className="text-left px-4 py-3 font-medium text-[var(--text-secondary)]">Tool</th>
                                            <th className="text-left px-4 py-3 font-medium text-[var(--text-secondary)] hidden md:table-cell">Category</th>
                                            <th className="text-center px-4 py-3 font-medium text-[var(--text-secondary)] hidden lg:table-cell">Rating</th>
                                            <th className="text-center px-4 py-3 font-medium text-[var(--text-secondary)] hidden lg:table-cell">Views</th>
                                            <th className="text-center px-4 py-3 font-medium text-[var(--text-secondary)]">Status</th>
                                            <th className="text-right px-4 py-3 font-medium text-[var(--text-secondary)]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingTools ? (
                                            <tr>
                                                <td colSpan={6} className="text-center py-12">
                                                    <div className="w-6 h-6 border-2 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin mx-auto" />
                                                </td>
                                            </tr>
                                        ) : toolsData?.tools?.length > 0 ? (
                                            toolsData.tools.map((tool: any) => (
                                                <tr key={tool.id} className="border-b border-[var(--border-default)] hover:bg-[var(--bg-surface-plus)]/30 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-plus)] flex items-center justify-center text-xs font-bold text-[var(--color-primary-light)] border border-[var(--border-default)] shrink-0">
                                                                {tool.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-[var(--text-primary)] flex items-center gap-1">
                                                                    {tool.name}
                                                                    {tool.isVerified && <CheckCircle2 size={12} className="text-[var(--color-primary)]" fill="var(--color-primary)" strokeWidth={0} />}
                                                                </div>
                                                                <div className="text-[10px] text-[var(--text-muted)] truncate max-w-[200px]">{tool.slug}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 hidden md:table-cell">
                                                        <span className="text-xs text-[var(--text-secondary)]">
                                                            {tool.category?.icon} {tool.category?.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                                                        <span className="flex items-center justify-center gap-1 text-xs text-[var(--color-warning)]">
                                                            <Star size={11} fill="var(--color-warning)" />
                                                            {tool.avgRating?.toFixed(1) || "0.0"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                                                        <span className="text-xs text-[var(--text-muted)]">{tool.viewCount}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            onClick={() => togglePublished.mutate({ id: tool.id, isPublished: !tool.isPublished })}
                                                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium cursor-pointer transition-colors ${tool.isPublished
                                                                ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                                                                : "bg-[var(--color-error)]/10 text-[var(--color-error)]"
                                                                }`}
                                                        >
                                                            {tool.isPublished ? "Published" : "Draft"}
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={() => window.open(`/tool/${tool.slug}`, "_blank")}
                                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
                                                                title="View"
                                                            >
                                                                <Eye size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm(`Are you sure you want to delete "${tool.name}"?`)) {
                                                                        deleteTool.mutate(tool.id);
                                                                    }
                                                                }}
                                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-12 text-[var(--text-muted)]">
                                                    No tools found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {toolsData?.pagination && toolsData.pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border-default)]">
                                    <span className="text-xs text-[var(--text-muted)]">
                                        Page {toolsData.pagination.page} of {toolsData.pagination.totalPages} ({toolsData.pagination.total} tools)
                                    </span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setToolPage((p) => Math.max(1, p - 1))}
                                            disabled={toolPage <= 1}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-surface-plus)] disabled:opacity-30 transition-colors"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={() => setToolPage((p) => Math.min(toolsData.pagination.totalPages, p + 1))}
                                            disabled={toolPage >= toolsData.pagination.totalPages}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-surface-plus)] disabled:opacity-30 transition-colors"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ==================== SUBMISSIONS TAB ==================== */}
                {activeTab === "submissions" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            Pending Submissions ({statsData?.pendingSubmissions?.length || 0})
                        </h2>

                        {statsData?.pendingSubmissions?.length > 0 ? (
                            <div className="space-y-4">
                                {statsData.pendingSubmissions.map((sub: any) => (
                                    <div key={sub.id} className="clay-card p-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ cursor: "default" }}>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{sub.name}</h3>
                                            <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{sub.description}</p>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                                                <span>By {sub.user?.name}</span>
                                                <span>•</span>
                                                <span>{sub.category}</span>
                                                <span>•</span>
                                                <span>{sub.pricingModel}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)] text-xs font-medium hover:bg-[var(--color-success)]/20 transition-colors">
                                                <CheckCircle2 size={14} />
                                                Approve
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-error)]/10 text-[var(--color-error)] text-xs font-medium hover:bg-[var(--color-error)]/20 transition-colors">
                                                <XCircle size={14} />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="clay-card p-12 text-center" style={{ cursor: "default" }}>
                                <FileText size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                                <p className="text-[var(--text-secondary)]">No pending submissions</p>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
