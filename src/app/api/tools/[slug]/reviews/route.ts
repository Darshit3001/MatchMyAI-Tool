import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/tools/[slug]/reviews — Fetch all reviews for a tool
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const tool = await prisma.tool.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }

        const reviews = await prisma.review.findMany({
            where: { toolId: tool.id },
            include: {
                user: {
                    select: { id: true, name: true, avatar: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Parse JSON strings for pros/cons
        const parsed = reviews.map((r) => ({
            ...r,
            pros: JSON.parse(r.pros || "[]"),
            cons: JSON.parse(r.cons || "[]"),
        }));

        return NextResponse.json({ reviews: parsed });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST /api/tools/[slug]/reviews — Submit or update a review
export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { slug } = await params;
        const body = await request.json();
        const { rating, title, content, pros, cons } = body;

        // Validate
        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
        }
        if (!content || content.trim().length < 10) {
            return NextResponse.json({ error: "Review must be at least 10 characters" }, { status: 400 });
        }

        const tool = await prisma.tool.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }

        // Upsert: create or update (one review per user per tool)
        const review = await prisma.review.upsert({
            where: {
                toolId_userId: {
                    toolId: tool.id,
                    userId: session.user.id,
                },
            },
            update: {
                rating,
                title: title || null,
                content: content.trim(),
                pros: JSON.stringify(pros || []),
                cons: JSON.stringify(cons || []),
            },
            create: {
                rating,
                title: title || null,
                content: content.trim(),
                pros: JSON.stringify(pros || []),
                cons: JSON.stringify(cons || []),
                toolId: tool.id,
                userId: session.user.id,
            },
            include: {
                user: {
                    select: { id: true, name: true, avatar: true },
                },
            },
        });

        // Recalculate tool's average rating and review count
        const aggregation = await prisma.review.aggregate({
            where: { toolId: tool.id },
            _avg: { rating: true },
            _count: { rating: true },
        });

        await prisma.tool.update({
            where: { id: tool.id },
            data: {
                avgRating: aggregation._avg.rating || 0,
                reviewCount: aggregation._count.rating || 0,
            },
        });

        return NextResponse.json({
            success: true,
            review: {
                ...review,
                pros: JSON.parse(review.pros || "[]"),
                cons: JSON.parse(review.cons || "[]"),
            },
        }, { status: 201 });
    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
