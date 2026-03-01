import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
        return NextResponse.json({
            success: true,
            data: { tools: [], categories: [], suggestions: [] },
        });
    }

    const [tools, categories] = await Promise.all([
        prisma.tool.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } },
                ],
                isPublished: true,
            },
            take: 10,
            orderBy: { viewCount: "desc" },
            include: { category: true, company: true, tags: { include: { tag: true } } },
        }),
        prisma.category.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } },
                ],
            },
            include: { _count: { select: { tools: true } } },
        }),
    ]);

    const transformedTools = tools.map((tool) => ({
        ...tool,
        tags: tool.tags.map((t) => t.tag),
    }));

    const transformedCategories = categories.map((cat) => ({
        ...cat,
        toolCount: cat._count.tools,
        _count: undefined,
    }));

    // Generate suggestions from tool names
    const suggestions = tools
        .map((t) => t.name)
        .slice(0, 5);

    return NextResponse.json({
        success: true,
        data: {
            tools: transformedTools,
            categories: transformedCategories,
            suggestions,
        },
    });
}
