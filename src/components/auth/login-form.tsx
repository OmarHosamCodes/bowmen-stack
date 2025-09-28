"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";

const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const emailID = useId();
	const passwordID = useId();
	const login = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		login.mutate(data);
	};

	return (
		<div className="mx-auto max-w-sm space-y-8">
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">Welcome back</h1>
				<p className="text-muted-foreground">
					Enter your email to sign in to your account
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<div className="relative">
						<Mail className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...register("email")}
							id={emailID}
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
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
						<Input
							{...register("password")}
							id={passwordID}
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password"
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
					disabled={isSubmitting || login.isPending}
				>
					{isSubmitting || login.isPending ? "Signing in..." : "Sign in"}
				</Button>
			</form>

			<div className="text-center text-sm">
				<span className="text-muted-foreground">Don't have an account? </span>
				<Link
					href="/register"
					className="underline underline-offset-4 hover:text-primary"
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}
