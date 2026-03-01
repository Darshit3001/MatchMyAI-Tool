import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Unauthorized", status: 401 };
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });
    if (user?.role !== "admin") return { error: "Forbidden", status: 403 };
    return { session, user };
}

// PUT — Update a tool
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await requireAdmin();
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { id } = await params;
        const body = await request.json();

        const tool = await prisma.tool.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.description && { description: body.description }),
                ...(body.website && { website: body.website }),
                ...(body.categoryId && { categoryId: body.categoryId }),
                ...(body.pricingModel && { pricingModel: body.pricingModel }),
                ...(body.priceFrom !== undefined && { priceFrom: body.priceFrom }),
                ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
                ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
                ...(body.isVerified !== undefined && { isVerified: body.isVerified }),
                ...(body.version && { version: body.version }),
            },
            include: { category: true },
        });

        return NextResponse.json({ success: true, tool });
    } catch (error) {
        console.error("Admin tool update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE — Remove a tool
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const auth = await requireAdmin();
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { id } = await params;

        await prisma.tool.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin tool delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
