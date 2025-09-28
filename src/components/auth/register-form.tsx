"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/\d/, "Password must contain at least one number")
		.regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const register = useRegister();
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();

	const {
		register: registerField,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = (data: RegisterFormData) => {
		register.mutate(data);
	};

	return (
		<div className="mx-auto max-w-sm space-y-8">
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">Create an account</h1>
				<p className="text-muted-foreground">
					Enter your information to create your account
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor={nameId}>Full Name</Label>
					<div className="relative">
						<User className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("name")}
							id={nameId}
							type="text"
							placeholder="John Doe"
							className="pl-10"
							disabled={isSubmitting}
						/>
					</div>
					{errors.name && (
						<p className="text-destructive text-sm">{errors.name.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor={emailId}>Email</Label>
					<div className="relative">
						<Mail className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("email")}
							id={emailId}
							type="email"
							placeholder="m@example.com"
							className="pl-10"
							disabled={isSubmitting}
						/>
					</div>
					{errors.email && (
						<p className="text-destructive text-sm">{errors.email.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor={passwordId}>Password</Label>
					<div className="relative">
						<Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...registerField("password")}
							id={passwordId}
							type={showPassword ? "text" : "password"}
							placeholder="Create a strong password"
							className="pr-10 pl-10"
							disabled={isSubmitting}
						/>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
							onClick={() => setShowPassword(!showPassword)}
							disabled={isSubmitting}
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4 text-muted-foreground" />
							) : (
								<Eye className="h-4 w-4 text-muted-foreground" />
							)}
						</Button>
					</div>
					{errors.password && (
						<p className="text-destructive text-sm">
							{errors.password.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					className="w-full"
					disabled={isSubmitting || register.isPending}
				>
					{isSubmitting || register.isPending
						? "Creating account..."
						: "Create account"}
				</Button>
			</form>

			<div className="text-center text-sm">
				<span className="text-muted-foreground">Already have an account? </span>
				<Link
					href="/login"
					className="underline underline-offset-4 hover:text-primary"
				>
					Sign in
				</Link>
			</div>
		</div>
	);
}
