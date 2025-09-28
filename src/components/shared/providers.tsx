import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

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
