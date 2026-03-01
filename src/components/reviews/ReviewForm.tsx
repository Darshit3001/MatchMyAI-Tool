"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Plus, Minus, Send, AlertCircle } from "lucide-react";

interface ReviewFormProps {
    toolSlug: string;
    onSuccess?: () => void;
    onClose?: () => void;
}

export function ReviewForm({ toolSlug, onSuccess, onClose }: ReviewFormProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pros, setPros] = useState<string[]>([""]);
    const [cons, setCons] = useState<string[]>([""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!session?.user) {
        return (
            <div className="clay-card p-6 text-center" style={{ cursor: "default" }}>
                <p className="text-[var(--text-secondary)] mb-3">Sign in to leave a review</p>
                <button
                    onClick={() => router.push(`/login?callbackUrl=/tool/${toolSlug}`)}
                    className="px-6 py-2 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-light)] transition-colors"
                >
                    Sign In
                </button>
            </div>
        );
    }

    const handleAddPro = () => setPros([...pros, ""]);
    const handleRemovePro = (idx: number) => setPros(pros.filter((_, i) => i !== idx));
    const handleProChange = (idx: number, value: string) => {
        const updated = [...pros];
        updated[idx] = value;
        setPros(updated);
    };

    const handleAddCon = () => setCons([...cons, ""]);
    const handleRemoveCon = (idx: number) => setCons(cons.filter((_, i) => i !== idx));
    const handleConChange = (idx: number, value: string) => {
        const updated = [...cons];
        updated[idx] = value;
        setCons(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (rating === 0) {
            setError("Please select a star rating");
            return;
        }
        if (content.trim().length < 10) {
            setError("Review must be at least 10 characters");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/tools/${toolSlug}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rating,
                    title: title.trim() || undefined,
                    content: content.trim(),
                    pros: pros.filter((p) => p.trim()),
                    cons: cons.filter((c) => c.trim()),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }

            // Reset form
            setRating(0);
            setTitle("");
            setContent("");
            setPros([""]);
            setCons([""]);

            onSuccess?.();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="clay-card p-6 relative"
            style={{ cursor: "default" }}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-plus)] transition-colors"
                >
                    <X size={16} />
                </button>
            )}

            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Write a Review</h3>
            <p className="text-sm text-[var(--text-muted)] mb-5">
                Share your experience to help others decide
            </p>

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2 text-sm"
                >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{error}</p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Star Rating */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Your Rating
                    </label>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-0.5 transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={28}
                                        className={
                                            (hoverRating || rating) >= star
                                                ? "text-[var(--color-warning)]"
                                                : "text-[var(--text-muted)]"
                                        }
                                        fill={
                                            (hoverRating || rating) >= star
                                                ? "var(--color-warning)"
                                                : "none"
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                        <AnimatePresence>
                            {(hoverRating || rating) > 0 && (
                                <motion.span
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -8 }}
                                    className="text-sm font-medium text-[var(--color-warning)]"
                                >
                                    {ratingLabels[hoverRating || rating]}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Title (optional) */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                        Title <span className="text-[var(--text-muted)]">(optional)</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Summarize your experience in a few words"
                        className="w-full px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]"
                        maxLength={100}
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                        Your Review
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What do you think about this tool? How has it helped you?"
                        rows={4}
                        className="w-full px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] resize-none"
                        maxLength={1000}
                    />
                    <div className="text-right text-[10px] text-[var(--text-muted)] mt-1">
                        {content.length}/1000
                    </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pros */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--color-success)] mb-2">
                            Pros
                        </label>
                        <div className="space-y-2">
                            {pros.map((pro, idx) => (
                                <div key={idx} className="flex gap-1.5">
                                    <input
                                        type="text"
                                        value={pro}
                                        onChange={(e) => handleProChange(idx, e.target.value)}
                                        placeholder={`Pro ${idx + 1}`}
                                        className="flex-1 px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg outline-none focus:border-[var(--color-success)]/50 transition-colors text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                                    />
                                    {pros.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePro(idx)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors shrink-0"
                                        >
                                            <Minus size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {pros.length < 5 && (
                                <button
                                    type="button"
                                    onClick={handleAddPro}
                                    className="flex items-center gap-1 text-xs text-[var(--color-success)] hover:underline"
                                >
                                    <Plus size={12} /> Add pro
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Cons */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--color-error)] mb-2">
                            Cons
                        </label>
                        <div className="space-y-2">
                            {cons.map((con, idx) => (
                                <div key={idx} className="flex gap-1.5">
                                    <input
                                        type="text"
                                        value={con}
                                        onChange={(e) => handleConChange(idx, e.target.value)}
                                        placeholder={`Con ${idx + 1}`}
                                        className="flex-1 px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg outline-none focus:border-[var(--color-error)]/50 transition-colors text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                                    />
                                    {cons.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCon(idx)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors shrink-0"
                                        >
                                            <Minus size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {cons.length < 5 && (
                                <button
                                    type="button"
                                    onClick={handleAddCon}
                                    className="flex items-center gap-1 text-xs text-[var(--color-error)] hover:underline"
                                >
                                    <Plus size={12} /> Add con
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/20"
                >
                    <Send size={16} />
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </motion.div>
    );
}
