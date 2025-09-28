import "@/styles/globals.css";

import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
	title: "Bowmen Stack",
	description: "Modern full-stack authentication with Next.js",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body>
				<SessionProvider>
					<ReactQueryProvider>
						{children}
						<ToasterProvider />
					</ReactQueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
