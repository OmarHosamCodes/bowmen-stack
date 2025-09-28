"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return (
			<section className="bg-primary py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="font-bold text-3xl text-primary-foreground tracking-tight sm:text-4xl">
							Ready to build something amazing?
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90 leading-8">
							You're all set! Start building your next project with the power of
							modern authentication.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Button variant="secondary" size="lg" className="text-base">
								View Dashboard
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="lg"
								className="text-base text-primary-foreground hover:bg-primary-foreground/10"
							>
								Documentation
							</Button>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-primary py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-bold text-3xl text-primary-foreground tracking-tight sm:text-4xl">
						Ready to get started?
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90 leading-8">
						Join thousands of developers who trust Bowmen Stack for their
						authentication needs.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button variant="secondary" asChild size="lg" className="text-base">
							<Link href="/register">
								Create Account
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button
							variant="ghost"
							asChild
							size="lg"
							className="text-base text-primary-foreground hover:bg-primary-foreground/10"
						>
							<Link href="/login">Sign In</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
