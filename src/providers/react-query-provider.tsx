"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode, useState } from "react";

interface ReactQueryProviderProps {
	children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
						retry: (failureCount, error: unknown) => {
							// Don't retry on 4xx errors except 408, 429
							const status = (error as { status?: number })?.status;
							if (status && status >= 400 && status < 500) {
								return status === 408 || status === 429;
							}
							// Retry up to 3 times for other errors
							return failureCount < 3;
						},
						refetchOnWindowFocus: false,
						refetchOnReconnect: true,
					},
					mutations: {
						retry: (failureCount, error: unknown) => {
							// Don't retry mutations on 4xx errors
							const status = (error as { status?: number })?.status;
							if (status && status >= 400 && status < 500) {
								return false;
							}
							// Retry up to 2 times for other errors
							return failureCount < 2;
						},
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
