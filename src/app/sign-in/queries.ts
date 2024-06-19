import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { user, userSchema } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getUserByEmailAndPassword(data: unknown) {
	return executeQuery({
		queryFn: async () => {
			const validatedData = userSchema.parse(data);
			if (validatedData.mode === "signIn") {
				return (
					await db
						.select()
						.from(user)
						.where(
							and(
								eq(user.password, validatedData.password),
								eq(user.email, validatedData.email)
							)
						)
				)[0];
			}
		},
		isProtected: false,
		serverErrorMessage: "getUserByEmailAndPassword",
	});
}
