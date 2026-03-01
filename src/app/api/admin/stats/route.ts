import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Middleware helper to check admin role
async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { error: "Unauthorized", status: 401 };
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });

    if (user?.role !== "admin") {
        return { error: "Forbidden — admin access required", status: 403 };
    }

    return { session, user };
}

// GET /api/admin/stats — Dashboard summary statistics
export async function GET() {
    try {
        const auth = await requireAdmin();
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const [toolCount, userCount, categoryCount, reviewCount, submissionCount, recentTools, recentUsers, pendingSubmissions] = await Promise.all([
            prisma.tool.count(),
            prisma.user.count(),
            prisma.category.count(),
            prisma.review.count(),
            prisma.toolSubmission.count({ where: { status: "pending" } }),
            prisma.tool.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                include: { category: true },
            }),
            prisma.user.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: { id: true, name: true, email: true, role: true, createdAt: true },
            }),
            prisma.toolSubmission.findMany({
                where: { status: "pending" },
                take: 10,
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { id: true, name: true, email: true } },
                },
            }),
        ]);

        return NextResponse.json({
            stats: {
                tools: toolCount,
                users: userCount,
                categories: categoryCount,
                reviews: reviewCount,
                pendingSubmissions: submissionCount,
            },
            recentTools,
            recentUsers,
            pendingSubmissions,
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
