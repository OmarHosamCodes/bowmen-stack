import { password } from "@/lib/password";
import { cache } from "@/lib/redis";
import { db } from "@/server/db";
import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "@/server/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { email, password: plainPassword } =
						loginSchema.parse(credentials);

					// Find user by email
					const [user] = await db
						.select()
						.from(users)
						.where(eq(users.email, email))
						.limit(1);

					if (!user || !user.password) {
						return null;
					}

					// Verify password
					const isValidPassword = await password.verify(
						plainPassword,
						user.password,
					);
					if (!isValidPassword) {
						return null;
					}

					// Cache user data for better performance
					await cache.user.set(user.id, {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
					});

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
					};
				} catch {
					return null;
				}
			},
		}),
	],
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.id && session.user) {
				session.user.id = token.id as string;

				// Try to get user from cache first
				const cachedUser = await cache.user.get(token.id as string);
				if (cachedUser) {
					session.user = { ...session.user, ...cachedUser };
				}
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
} satisfies NextAuthConfig;
