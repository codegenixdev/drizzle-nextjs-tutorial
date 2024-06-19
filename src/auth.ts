import { and, eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z, ZodError } from "zod";

import { db } from "@/db";
import { user } from "@/db/schema";

export const signInSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = await signInSchema.parseAsync(
						credentials
					);

					const dbUser = (
						await db
							.select()
							.from(user)
							.where(and(eq(user.password, password), eq(user.email, email)))
					)[0];

					if (!dbUser) {
						throw new Error("User not found.");
					}

					return dbUser;
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
				}
			},
		}),
	],
});
