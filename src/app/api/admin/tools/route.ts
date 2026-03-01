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

// GET — List all tools (with pagination, search)
export async function GET(request: Request) {
    try {
        const auth = await requireAdmin();
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const search = searchParams.get("search") || "";

        const where = search
            ? {
                OR: [
                    { name: { contains: search } },
                    { slug: { contains: search } },
                ],
            }
            : {};

        const [tools, total] = await Promise.all([
            prisma.tool.findMany({
                where,
                include: { category: true, company: true },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.tool.count({ where }),
        ]);

        return NextResponse.json({
            tools,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Admin tools list error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST — Create a new tool
export async function POST(request: Request) {
    try {
        const auth = await requireAdmin();
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const body = await request.json();
        const { name, description, website, categoryId, pricingModel, priceFrom, version, country } = body;

        if (!name || !description || !website || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const tool = await prisma.tool.create({
            data: {
                slug,
                name,
                description,
                website,
                categoryId,
                pricingModel: pricingModel || "FREEMIUM",
                priceFrom: priceFrom || null,
                version: version || null,
                country: country || null,
            },
            include: { category: true },
        });

        return NextResponse.json({ success: true, tool }, { status: 201 });
    } catch (error) {
        console.error("Admin tool create error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
