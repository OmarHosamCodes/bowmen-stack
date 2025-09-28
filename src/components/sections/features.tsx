import { Database, Gauge, Lock, Shield, Users, Zap } from "lucide-react";

const features = [
	{
		icon: Shield,
		title: "Secure Authentication",
		description:
			"Enterprise-grade security with bcrypt password hashing and session management.",
	},
	{
		icon: Zap,
		title: "Lightning Fast",
		description:
			"Built with Next.js 15, React Query for caching, and Redis for session storage.",
	},
	{
		icon: Users,
		title: "User Management",
		description:
			"Complete user registration, login, logout, and profile management system.",
	},
	{
		icon: Database,
		title: "Scalable Database",
		description:
			"PostgreSQL with Drizzle ORM for type-safe database operations.",
	},
	{
		icon: Lock,
		title: "Privacy Focused",
		description:
			"Built-in privacy controls and GDPR-compliant user data handling.",
	},
	{
		icon: Gauge,
		title: "Performance Optimized",
		description:
			"Server-side rendering, caching strategies, and optimized bundle size.",
	},
];

export function Features() {
	return (
		<section className="bg-muted/50 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
						Everything you need to build modern apps
					</h2>
					<p className="mt-6 text-lg text-muted-foreground leading-8">
						A complete authentication solution with all the modern features you
						expect from a production-ready application.
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.title} className="flex flex-col">
								<dt className="flex items-center gap-x-3 font-semibold text-base text-foreground leading-7">
									<feature.icon className="h-5 w-5 flex-none text-primary" />
									{feature.title}
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base text-muted-foreground leading-7">
									<p className="flex-auto">{feature.description}</p>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}
