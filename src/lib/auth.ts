import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { wait } from "@/lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				await wait();

				return {
					id: "1",
					fullName: "mock full name",
					age: 18,
					password: "mock password",
					email: "mock@mock.com",
					createdAt: "2024-06-23 16:05:26.954952",
					updatedAt: "2024-06-23 16:05:26.954952",
				};
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				// @ts-ignore
				token.fullName = user.fullName;
			}
			return token;
		},
		session({ session, token }) {
			// @ts-ignore
			session.user.id = token.id;
			// @ts-ignore
			session.user.fullName = token.fullName;
			return session;
		},
	},
});
