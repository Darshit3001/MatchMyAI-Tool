import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ savedTools: [] }, { status: 401 });
        }

        const saves = await prisma.savedTool.findMany({
            where: { userId: session.user.id },
            include: {
                tool: {
                    include: {
                        category: true,
                        company: true,
                        tags: { include: { tag: true } },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Map it back to the expected Tool format
        const savedTools = saves.map((save) => ({
            ...save.tool,
            tags: save.tool.tags.map((t) => t.tag),
            savedAt: save.createdAt,
        }));

        const savedToolIds = savedTools.map((t) => t.id);

        return NextResponse.json({ success: true, savedTools, savedToolIds });
    } catch (error) {
        console.error("Error fetching saved tools:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
