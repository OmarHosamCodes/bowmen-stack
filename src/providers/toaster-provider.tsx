"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
	return (
		<Toaster
			position="top-right"
			gutter={12}
			containerStyle={{
				top: 20,
				left: 20,
				bottom: 20,
				right: 20,
			}}
			toastOptions={{
				duration: 4000,
				style: {
					background: "hsl(var(--background))",
					color: "hsl(var(--foreground))",
					border: "1px solid hsl(var(--border))",
				},
				success: {
					iconTheme: {
						primary: "hsl(var(--primary))",
						secondary: "hsl(var(--primary-foreground))",
					},
				},
				error: {
					iconTheme: {
						primary: "hsl(var(--destructive))",
						secondary: "hsl(var(--destructive-foreground))",
					},
				},
			}}
		/>
	);
}
