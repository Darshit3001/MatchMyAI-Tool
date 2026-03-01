"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tools as allTools, categories } from "@/data/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";

interface QuizQuestion {
    id: string;
    question: string;
    options: { id: string; label: string; emoji: string; tags: string[] }[];
}

const quizQuestions: QuizQuestion[] = [
    {
        id: "role",
        question: "What best describes you?",
        options: [
            { id: "developer", label: "Developer / Engineer", emoji: "💻", tags: ["code", "automation"] },
            { id: "marketer", label: "Marketer / Content Creator", emoji: "📈", tags: ["marketing", "writing", "social-media"] },
            { id: "designer", label: "Designer / Creative", emoji: "🎨", tags: ["design", "image-generation", "video"] },
            { id: "student", label: "Student / Researcher", emoji: "📚", tags: ["education", "research"] },
            { id: "business", label: "Business / Entrepreneur", emoji: "💼", tags: ["productivity", "automation", "finance"] },
            { id: "casual", label: "Just exploring!", emoji: "🔍", tags: [] },
        ],
    },
    {
        id: "task",
        question: "What do you want to accomplish?",
        options: [
            { id: "write", label: "Write content & copy", emoji: "✍️", tags: ["writing", "marketing"] },
            { id: "create-images", label: "Generate images & art", emoji: "🖼️", tags: ["image-generation", "design"] },
            { id: "code-help", label: "Write or review code", emoji: "🧑‍💻", tags: ["code"] },
            { id: "create-video", label: "Create or edit videos", emoji: "🎬", tags: ["video"] },
            { id: "chat", label: "Chat & get answers", emoji: "💬", tags: ["chatbot"] },
            { id: "automate", label: "Automate workflows", emoji: "⚡", tags: ["automation", "productivity"] },
            { id: "analyze", label: "Analyze data", emoji: "📊", tags: ["data-analysis", "research"] },
            { id: "translate", label: "Translate languages", emoji: "🌐", tags: ["translation"] },
        ],
    },
    {
        id: "budget",
        question: "What's your budget?",
        options: [
            { id: "free", label: "Free only", emoji: "🆓", tags: ["free"] },
            { id: "low", label: "Under $20/mo", emoji: "💵", tags: ["budget"] },
            { id: "mid", label: "$20 – $50/mo", emoji: "💰", tags: ["mid"] },
            { id: "high", label: "No limit", emoji: "💎", tags: ["premium"] },
        ],
    },
    {
        id: "priority",
        question: "What matters most to you?",
        options: [
            { id: "quality", label: "Best quality output", emoji: "🏆", tags: ["quality"] },
            { id: "speed", label: "Speed & ease of use", emoji: "⚡", tags: ["speed"] },
            { id: "price", label: "Best value for money", emoji: "💰", tags: ["value"] },
            { id: "features", label: "Most features", emoji: "🔧", tags: ["features"] },
        ],
    },
];

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quizQuestions[currentStep];
    const totalSteps = quizQuestions.length;
    const progress = ((currentStep + (showResults ? 1 : 0)) / totalSteps) * 100;

    const handleSelect = (optionId: string) => {
        setAnswers({ ...answers, [currentQuestion.id]: optionId });
        if (currentStep < totalSteps - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        } else {
            setTimeout(() => setShowResults(true), 300);
        }
    };

    const handleBack = () => {
        if (showResults) {
            setShowResults(false);
        } else if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResults(false);
    };

    // Calculate recommended tools
    const recommendedTools = useMemo(() => {
        if (!showResults) return [];

        const selectedOptions = Object.entries(answers).map(([qId, oId]) => {
            const q = quizQuestions.find((q) => q.id === qId);
            return q?.options.find((o) => o.id === oId);
        }).filter(Boolean);

        const tagScores: Record<string, number> = {};
        selectedOptions.forEach((opt) => {
            opt!.tags.forEach((tag) => {
                tagScores[tag] = (tagScores[tag] || 0) + 1;
            });
        });

        // Budget filter
        const budgetAnswer = answers["budget"];

        return allTools
            .map((tool) => {
                let score = 0;
                // Category match
                if (tagScores[tool.category.slug]) score += tagScores[tool.category.slug] * 3;
                // Tag match
                tool.tags.forEach((tag) => {
                    if (tagScores[tag.slug]) score += tagScores[tag.slug] * 2;
                });
                // Rating bonus
                score += tool.avgRating;
                // Budget filter
                if (budgetAnswer === "free" && tool.pricingModel !== "FREE" && tool.pricingModel !== "FREEMIUM") score -= 5;
                if (budgetAnswer === "low" && (tool.priceFrom || 0) > 20) score -= 2;

                return { ...tool, matchScore: score };
            })
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 8);
    }, [showResults, answers]);

    return (
        <div className="pb-24 lg:pb-8 px-4 lg:px-8 max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 pb-6 text-center"
            >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 mx-auto mb-4">
                    <Sparkles size={28} className="text-[var(--color-primary)]" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Find Your Perfect AI Tool
                </h1>
                <p className="text-sm text-[var(--text-tertiary)]">
                    Answer a few questions and we&apos;ll match you with the best AI tools for your needs
                </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>{showResults ? "Complete!" : `Question ${currentStep + 1} of ${totalSteps}`}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* Quiz Content */}
            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key={`question-${currentStep}`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Question */}
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 text-center">
                            {currentQuestion.question}
                        </h2>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers[currentQuestion.id] === option.id;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option.id)}
                                        className={`clay-card p-4 text-left transition-all duration-200 ${isSelected
                                                ? "!border-[var(--color-primary)] !shadow-[var(--shadow-clay-hover)] glow-primary"
                                                : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{option.emoji}</span>
                                            <span className={`text-sm font-medium ${isSelected ? "text-[var(--color-primary-light)]" : "text-[var(--text-secondary)]"
                                                }`}>
                                                {option.label}
                                            </span>
                                            {isSelected && (
                                                <CheckCircle2 size={16} className="text-[var(--color-primary)] ml-auto" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Results header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-3 border border-[var(--color-success)]/20">
                                <CheckCircle2 size={32} className="text-[var(--color-success)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                                Your Recommended Tools
                            </h2>
                            <p className="text-sm text-[var(--text-tertiary)]">
                                Based on your answers, here are our top picks for you
                            </p>
                        </div>

                        <ToolGrid tools={recommendedTools} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0 && !showResults}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ArrowLeft size={14} />
                    Back
                </button>

                {showResults && (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
                    >
                        <RotateCcw size={14} />
                        Retake Quiz
                    </button>
                )}
            </div>
        </div>
    );
}
