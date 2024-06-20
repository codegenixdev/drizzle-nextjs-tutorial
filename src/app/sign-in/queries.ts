import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { user } from "@/db/schema";
import { userSchema } from "@/db/schema/user";
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
