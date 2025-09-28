"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
	const { isAuthenticated, user } = useAuth();

	return (
		<section className="relative overflow-hidden bg-background pt-20 pb-16 sm:pt-32 sm:pb-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					{isAuthenticated ? (
						<div className="mb-8">
							<h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-6xl">
								Welcome back,{" "}
								<span className="text-primary">{user?.name || "User"}</span>!
							</h1>
							<p className="mt-6 text-lg text-muted-foreground leading-8">
								You're successfully signed in to Bowmen Stack. Explore the
								features and start building amazing things.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Button size="lg" className="text-base">
									Get Started
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
								<Button variant="outline" size="lg" className="text-base">
									Learn More
								</Button>
							</div>
						</div>
					) : (
						<div>
							<h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-6xl">
								Modern Authentication for{" "}
								<span className="text-primary">Next.js</span>
							</h1>
							<p className="mt-6 text-lg text-muted-foreground leading-8">
								A complete authentication solution with React Query, Redis
								caching, and beautiful UI components. Built for scalability and
								performance.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Button asChild size="lg" className="text-base">
									<Link href="/register">
										Get Started
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button
									variant="outline"
									asChild
									size="lg"
									className="text-base"
								>
									<Link href="/login">Sign In</Link>
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Background gradient */}
			<div className="-z-10 absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
				<div className="-translate-x-1/2 relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
			</div>
		</section>
	);
}
