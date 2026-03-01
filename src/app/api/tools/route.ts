import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category");
    const search = searchParams.get("q");
    const sort = searchParams.get("sort") || "latest";
    const pricing = searchParams.get("pricing");

    // Build Prisma where clause
    const where: Record<string, unknown> = { isPublished: true };

    if (search) {
        where.OR = [
            { name: { contains: search } },
            { description: { contains: search } },
        ];
    }

    if (category) {
        where.category = { slug: category };
    }

    if (pricing) {
        where.pricingModel = pricing.toUpperCase();
    }

    // Build orderBy
    let orderBy: Record<string, string> = { releasedAt: "desc" };
    if (sort === "rating") orderBy = { avgRating: "desc" };
    else if (sort === "views") orderBy = { viewCount: "desc" };
    else if (sort === "saves") orderBy = { saveCount: "desc" };
    else if (sort === "name") orderBy = { name: "asc" };

    const [total, data] = await Promise.all([
        prisma.tool.count({ where }),
        prisma.tool.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                category: true,
                company: true,
                tags: { include: { tag: true } },
                comments: {
                    take: 1,
                    orderBy: { upvotes: "desc" },
                    include: { user: { select: { name: true, avatar: true } } },
                },
            },
        }),
    ]);

    // Transform to match frontend expectations
    const tools = data.map((tool) => ({
        ...tool,
        tags: tool.tags.map((t) => t.tag),
        commentPreview: tool.comments[0]
            ? {
                content: tool.comments[0].content,
                userName: tool.comments[0].user.name,
                userAvatar: tool.comments[0].user.avatar,
                upvotes: tool.comments[0].upvotes,
            }
            : undefined,
        comments: undefined,
    }));

    return NextResponse.json({
        success: true,
        data: tools,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasMore: (page - 1) * limit + limit < total,
        },
    });
}
