"use client";

import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function Header() {
	const { isAuthenticated, isLoading } = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 max-w-screen-2xl items-center">
				<div className="mx-4 flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="font-bold text-xl">Bowmen</span>
					</Link>
				</div>
				<div className="flex-1" />
				<div className="flex items-center">
					{!isLoading &&
						(isAuthenticated ? (
							<UserMenu />
						) : (
							<div className="mx-4 flex items-center gap-2">
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
