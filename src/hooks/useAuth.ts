"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Types
interface RegisterData {
	name: string;
	email: string;
	password: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface ApiError {
	error: string;
	details?: unknown;
}

// API Functions
async function registerUser(data: RegisterData) {
	const response = await fetch("/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData: ApiError = await response.json();
		throw new Error(errorData.error || "Registration failed");
	}

	return response.json();
}

async function getSession() {
	const response = await fetch("/api/auth/session");

	if (!response.ok) {
		if (response.status === 401) {
			return null; // Not authenticated
		}
		throw new Error("Failed to get session");
	}

	return response.json();
}

// Hooks
export function useAuth() {
	const { data: session, status } = useSession();

	return {
		user: session?.user || null,
		isLoading: status === "loading",
		isAuthenticated: !!session?.user,
	};
}

export function useRegister() {
	const router = useRouter();

	return useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			toast.success("Account created successfully! Please sign in.");
			router.push("/login");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Registration failed");
		},
	});
}

export function useLogin() {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: LoginData) => {
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				throw new Error("Invalid email or password");
			}

			return result;
		},
		onSuccess: () => {
			toast.success("Welcome back!");
			// Invalidate session query to refetch user data
			queryClient.invalidateQueries({ queryKey: ["session"] });
			router.push("/");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Login failed");
		},
	});
}

export function useLogout() {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			await signOut({ redirect: false });
		},
		onSuccess: () => {
			toast.success("Signed out successfully");
			// Clear all cached data
			queryClient.clear();
			router.push("/login");
		},
		onError: () => {
			toast.error("Error signing out");
		},
	});
}

export function useSessionQuery() {
	return useQuery({
		queryKey: ["session"],
		queryFn: getSession,
		retry: false,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
