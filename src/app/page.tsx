import { Header } from "@/components/layout/header";
import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<Hero />
				<Features />
				<CTA />
			</main>
		</div>
	);
}
