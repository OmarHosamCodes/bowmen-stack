import { password } from "@/lib/password";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, password: plainPassword } = registerSchema.parse(body);

		// Validate password strength
		const passwordValidation = password.validate(plainPassword);
		if (!passwordValidation.isValid) {
			return NextResponse.json(
				{
					error: "Password validation failed",
					details: passwordValidation.errors,
				},
				{ status: 400 },
			);
		}

		// Check if user already exists
		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists" },
				{ status: 409 },
			);
		}

		// Hash password
		const hashedPassword = await password.hash(plainPassword);

		// Create user
		const [newUser] = await db
			.insert(users)
			.values({
				name,
				email,
				password: hashedPassword,
			})
			.returning({
				id: users.id,
				name: users.name,
				email: users.email,
				createdAt: users.createdAt,
			});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: newUser,
			},
			{ status: 201 },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Validation failed", details: error.issues },
				{ status: 400 },
			);
		}

		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
