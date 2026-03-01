import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const tool = await prisma.tool.findUnique({
        where: { slug },
        include: {
            category: true,
            company: true,
            tags: { include: { tag: true } },
            comments: {
                take: 5,
                orderBy: { upvotes: "desc" },
                include: { user: { select: { id: true, name: true, avatar: true } } },
            },
            deals: { where: { isActive: true, expiresAt: { gt: new Date() } } },
        },
    });

    if (!tool) {
        return NextResponse.json(
            { success: false, error: "Tool not found" },
            { status: 404 }
        );
    }

    // Get alternatives (same category, excluding self)
    const alternatives = await prisma.tool.findMany({
        where: { categoryId: tool.categoryId, slug: { not: slug } },
        take: 4,
        orderBy: { avgRating: "desc" },
        include: { category: true, company: true, tags: { include: { tag: true } } },
    });

    const transformed = {
        ...tool,
        tags: tool.tags.map((t) => t.tag),
        alternatives: alternatives.map((alt) => ({
            ...alt,
            tags: alt.tags.map((t) => t.tag),
        })),
    };

    return NextResponse.json({ success: true, data: transformed });
}
