"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Globe, Tag, DollarSign, FileText, Image, Send, CheckCircle2 } from "lucide-react";

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="pb-24 lg:pb-8 px-4 lg:px-8 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pt-20 text-center"
                >
                    <div className="w-20 h-20 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-4 border border-[var(--color-success)]/20">
                        <CheckCircle2 size={40} className="text-[var(--color-success)]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Submitted!</h1>
                    <p className="text-sm text-[var(--text-tertiary)] mb-6">
                        Your tool has been submitted for review. We&apos;ll notify you once it&apos;s approved.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-sm transition-all"
                    >
                        Submit Another
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20">
                        <Upload size={24} className="text-[var(--color-accent)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                            Submit Your AI Tool
                        </h1>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            Get discovered by millions of AI enthusiasts
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Form */}
            <motion.form
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
            >
                {/* Tool Name */}
                <div className="clay-card p-5 space-y-4" style={{ cursor: "default" }}>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <FileText size={16} className="text-[var(--color-primary)]" />
                        Basic Information
                    </h3>

                    <div>
                        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Tool Name *</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., ChatGPT, Midjourney"
                            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-plus)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Description *</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Brief description of what your tool does..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-plus)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-[var(--text-secondary)] mb-1 block flex items-center gap-1">
                            <Globe size={12} />
                            Website URL *
                        </label>
                        <input
                            type="url"
                            required
                            placeholder="https://your-tool.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-plus)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>
                </div>

                {/* Category & Pricing */}
                <div className="clay-card p-5 space-y-4" style={{ cursor: "default" }}>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <Tag size={16} className="text-[var(--color-primary)]" />
                        Category & Pricing
                    </h3>

                    <div>
                        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Category *</label>
                        <select className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-plus)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors">
                            <option value="">Select a category</option>
                            <option value="chatbot">Chatbots</option>
                            <option value="image-generation">Image Generation</option>
                            <option value="writing">Writing</option>
                            <option value="code">Code</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio & Music</option>
                            <option value="productivity">Productivity</option>
                            <option value="marketing">Marketing</option>
                            <option value="design">Design</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-[var(--text-secondary)] mb-1 block flex items-center gap-1">
                            <DollarSign size={12} />
                            Pricing Model *
                        </label>
                        <select className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-plus)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] transition-colors">
                            <option value="">Select pricing</option>
                            <option value="free">100% Free</option>
                            <option value="freemium">Freemium</option>
                            <option value="paid">Paid</option>
                            <option value="contact">Contact for pricing</option>
                        </select>
                    </div>
                </div>

                {/* Logo */}
                <div className="clay-card p-5 space-y-4" style={{ cursor: "default" }}>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <Image size={16} className="text-[var(--color-primary)]" />
                        Media
                    </h3>
                    <div className="border-2 border-dashed border-[var(--border-default)] rounded-xl p-8 text-center hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer">
                        <Upload size={24} className="mx-auto text-[var(--text-muted)] mb-2" />
                        <p className="text-sm text-[var(--text-secondary)]">Upload your tool&apos;s logo</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">PNG, JPG, SVG up to 2MB</p>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[var(--color-primary)]/25"
                >
                    <Send size={16} />
                    Submit Tool for Review
                </button>
            </motion.form>
        </div>
    );
}
