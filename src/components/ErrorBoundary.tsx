"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="flex items-center justify-center min-h-[400px] p-8">
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--color-error)]/10 flex items-center justify-center mx-auto mb-4 border border-[var(--color-error)]/20">
                                <AlertTriangle size={32} className="text-[var(--color-error)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-sm text-[var(--text-tertiary)] mb-6">
                                {this.state.error?.message || "An unexpected error occurred. Please try again."}
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <button
                                    onClick={() => this.setState({ hasError: false, error: null })}
                                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25"
                                >
                                    <RotateCcw size={14} />
                                    Try Again
                                </button>
                                <Link
                                    href="/"
                                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-surface-plus)] transition-colors"
                                >
                                    <Home size={14} />
                                    Go Home
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
