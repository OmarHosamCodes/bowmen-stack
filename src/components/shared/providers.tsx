import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ReactQueryProvider>
				<ThemeProvider defaultTheme="light">
					{children}
					<Toaster />
				</ThemeProvider>
			</ReactQueryProvider>
		</SessionProvider>
	);
}
