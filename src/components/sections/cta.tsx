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
							Ready to start your project?
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90 leading-8">
							You've seen the auth in action! Clone this boilerplate and
							customize it for your next SaaS, web app, or startup idea.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Button
								variant="secondary"
								size="lg"
								className="text-base"
								asChild
							>
								<Link
									href="https://github.com/OmarHosamCodes/bowmen-stack"
									target="_blank"
								>
									Clone Boilerplate
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button
								variant="ghost"
								size="lg"
								className="text-base text-primary-foreground hover:bg-primary-foreground/10"
								asChild
							>
								<Link href="#features">Explore Features</Link>
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
						Ready to build your app?
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90 leading-8">
						Join developers who save weeks of setup time with our
						production-ready boilerplate. Try the demo first, then make it
						yours.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button variant="secondary" asChild size="lg" className="text-base">
							<Link href="/register">
								Try Demo
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button
							variant="ghost"
							asChild
							size="lg"
							className="text-base text-primary-foreground hover:bg-primary-foreground/10"
						>
							<Link
								href="https://github.com/OmarHosamCodes/bowmen-stack"
								target="_blank"
							>
								View Source
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
