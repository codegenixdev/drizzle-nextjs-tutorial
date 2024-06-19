"use server";

import { db } from "@/db";
import { user, UserSchema, userSchema } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";

export async function signUp(data: UserSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = userSchema.parse(data);
			await db.insert(user).values(validatedData);
		},
		isProtected: false,
		successMessage: "Signed up successfully",
	});
}
