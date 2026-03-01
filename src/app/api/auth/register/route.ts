import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // Validate basic fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: "credentials",
                role: "user",
            },
        });

        return NextResponse.json(
            {
                success: true,
                user: { id: newUser.id, name: newUser.name, email: newUser.email },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("API error during registration:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
