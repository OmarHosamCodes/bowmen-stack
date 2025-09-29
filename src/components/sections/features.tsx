import { Code, Database, Gauge, Palette, Shield, Zap } from "lucide-react";

const features = [
	{
		icon: Shield,
		title: "Complete Authentication",
		description:
			"Production-ready auth system with registration, login, sessions, and security best practices built-in.",
	},
	{
		icon: Zap,
		title: "Modern Tech Stack",
		description:
			"Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, React Query, and Redis - all configured and ready to use.",
	},
	{
		icon: Database,
		title: "Database Ready",
		description:
			"PostgreSQL with Drizzle ORM, migrations, and type-safe schema. No database setup headaches.",
	},
	{
		icon: Code,
		title: "Developer Experience",
		description:
			"BiomeJS, BunJS, TypeScript, hot reload, and comprehensive tooling for productive development.",
	},
	{
		icon: Palette,
		title: "Beautiful UI Components",
		description:
			"pre-built components with shadcn/ui, dark/light mode, and responsive design system.",
	},
	{
		icon: Gauge,
		title: "Production Optimized",
		description:
			"Caching strategies, performance optimizations, and deployment-ready configuration included.",
	},
];

export function Features() {
	return (
		<section className="bg-muted/50 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
						Everything you need in one boilerplate
					</h2>
					<p className="mt-6 text-lg text-muted-foreground leading-8">
						Skip months of setup and configuration. Start with a
						production-ready foundation that includes all the modern tools and
						patterns you need.
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
