"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Github, AlertCircle } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            setError("Please fill in all fields");
            setIsPending(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }

            // Immediately sign in after successful registration
            const signInResult = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (signInResult?.error) {
                throw new Error(signInResult.error);
            }

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    const handleGithubSignIn = () => {
        signIn("github", { callbackUrl: "/" });
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4 bg-surface-50 dark:bg-surface-900 border-x border-border/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="clay-card rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl -ml-10 -mt-10" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-10 -mb-10" />

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-display font-bold text-text-900 dark:text-white mb-2">
                                Create Account
                            </h1>
                            <p className="text-text-500 dark:text-text-400">
                                Join APT AI to curate your ultimate toolkit
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-3 text-sm"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-700 dark:text-text-300 ml-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-text-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Alex Turing"
                                        className="w-full pl-10 pr-4 py-3 bg-surface-100 dark:bg-surface-800 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-700 dark:text-text-300 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-text-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 bg-surface-100 dark:bg-surface-800 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-700 dark:text-text-300 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-text-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-surface-100 dark:bg-surface-800 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                        minLength={6}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full relative group overflow-hidden rounded-xl p-[1px] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="relative bg-surface-50 dark:bg-surface-900 px-4 py-3 rounded-xl flex items-center justify-center transition-all group-hover:bg-opacity-0">
                                    <span className="font-semibold text-text-900 dark:text-white group-hover:text-white transition-colors flex items-center gap-2">
                                        {isPending ? "Creating account..." : "Sign Up"}
                                        {!isPending && <ArrowRight className="w-4 h-4" />}
                                    </span>
                                </div>
                            </button>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-surface-50 dark:bg-surface-900 text-text-500">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-surface-800 border border-border rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium text-sm"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGithubSignIn}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-surface-800 border border-border rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium text-sm"
                                >
                                    <Github className="w-5 h-5 text-gray-900 dark:text-white" />
                                    GitHub
                                </button>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-text-500">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
