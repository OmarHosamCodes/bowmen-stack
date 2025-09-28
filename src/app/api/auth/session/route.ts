import { NextResponse } from "next/server";
import { auth } from "@/server/auth";

export async function GET() {
	try {
		const session = await auth();

		if (!session?.user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		return NextResponse.json({
			user: session.user,
		});
	} catch (error) {
		console.error("Session validation error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
