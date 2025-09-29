"use client";

import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../shared/theme-toggle";
export function Header() {
	const { isAuthenticated, isLoading } = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between gap-4">
				<Link href="/" className="flex items-center gap-3">
					<Image
						src="/logo-nobg.png"
						className="h-12 w-auto object-contain invert dark:invert-0"
						alt="Logo"
						width={128}
						height={128}
						priority
					/>
				</Link>
				<div className="flex items-center gap-4">
					<ThemeToggle />
					{!isLoading &&
						(isAuthenticated ? (
							<UserMenu />
						) : (
							<div className="flex items-center gap-2">
								<Button variant="ghost" asChild>
									<Link href="/login">Sign in</Link>
								</Button>
								<Button asChild>
									<Link href="/register">Sign up</Link>
								</Button>
							</div>
						))}
				</div>
			</div>
		</header>
	);
}
