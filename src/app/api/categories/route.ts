import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { tools: true } } },
        orderBy: { name: "asc" },
    });

    const data = categories.map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        toolCount: cat._count.tools,
    }));

    return NextResponse.json({ success: true, data });
}
