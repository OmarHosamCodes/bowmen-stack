import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { auth } from "@/server/auth";

export default async function RegisterPage() {
	const session = await auth();

	// Redirect if already authenticated
	if (session?.user) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
			<div className="w-full max-w-md">
				<div className="rounded-lg border bg-card p-8 shadow-lg">
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
