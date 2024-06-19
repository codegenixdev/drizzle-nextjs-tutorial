import { and, eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/db";
import { user, userSchema } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const parsedCredentials = await userSchema.parseAsync(credentials);

				if (parsedCredentials.mode === "signIn") {
					const dbUser = (
						await db
							.select()
							.from(user)
							.where(
								and(
									eq(user.password, parsedCredentials.password),
									eq(user.email, parsedCredentials.email)
								)
							)
					)[0];

					if (!dbUser) {
						throw new Error("User not found / Wrong credentials");
					}

					return { ...dbUser, id: dbUser.id.toString() };
				}
				return null;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.fullName = user.fullName;
			}
			return token;
		},
		session({ session, token }) {
			session.user.id = token.id;
			session.user.fullName = token.fullName;
			return session;
		},
	},
});
