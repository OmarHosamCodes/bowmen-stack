import "@/styles/globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/components/shared/providers";

export const metadata: Metadata = {
	title: "Bowmen Stack",
	description: "Modern full-stack authentication with Next.js",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${poppins.variable}`}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
