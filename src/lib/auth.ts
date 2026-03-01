import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "m@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || (!user.password && user.provider !== "credentials")) {
                    throw new Error("Account configured using OAuth provider.");
                }

                if (!user.password) {
                    throw new Error("Invalid credentials");
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.avatar,
                    role: user.role,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "credentials") {
                return true;
            }

            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email! },
                    });

                    if (!existingUser) {
                        // Create new user for OAuth
                        const newUser = await prisma.user.create({
                            data: {
                                email: user.email!,
                                name: user.name || "User",
                                avatar: user.image,
                                provider: account.provider,
                                providerId: account.providerAccountId,
                                role: "user",
                            },
                        });
                        (user as any).id = newUser.id;
                        (user as any).role = newUser.role;
                    } else {
                        (user as any).id = existingUser.id;
                        (user as any).role = existingUser.role;

                        // Link provider if not linked yet
                        if (!existingUser.providerId) {
                            await prisma.user.update({
                                where: { id: existingUser.id },
                                data: {
                                    provider: account.provider,
                                    providerId: account.providerAccountId,
                                    avatar: existingUser.avatar || user.image,
                                },
                            });
                        }
                    }
                    return true;
                } catch (error) {
                    console.error("Error during OAuth sign-in:", error);
                    return false;
                }
            }

            return false;
        },
        async jwt({ token, user, account }) {
            // First time sign in
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role || "user";
                token.avatar = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role as string;
                session.user.image = token.avatar as string || session.user.image;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_only_for_dev_mode_12345",
};
