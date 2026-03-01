import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

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

        const tool = await prisma.tool.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }

        const existingSave = await prisma.savedTool.findUnique({
            where: {
                userId_toolId: {
                    userId: session.user.id,
                    toolId: tool.id,
                },
            },
        });

        let isSaved = false;

        if (existingSave) {
            // Unsave
            await prisma.savedTool.delete({
                where: {
                    userId_toolId: {
                        userId: session.user.id,
                        toolId: tool.id,
                    },
                },
            });
            // Decrement save count
            await prisma.tool.update({
                where: { id: tool.id },
                data: { saveCount: { decrement: 1 } },
            });
        } else {
            // Save
            await prisma.savedTool.create({
                data: {
                    userId: session.user.id,
                    toolId: tool.id,
                },
            });
            // Increment save count
            await prisma.tool.update({
                where: { id: tool.id },
                data: { saveCount: { increment: 1 } },
            });
            isSaved = true;
        }

        return NextResponse.json({ success: true, isSaved });
    } catch (error) {
        console.error("Error saving tool:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
