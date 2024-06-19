"use server";

import { signIn as authSignIn } from "@/auth";
import { UserSchema, userSchema } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";

export async function signIn(data: UserSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = userSchema.parse(data);
			await authSignIn("credentials", { ...validatedData, redirectTo: "/" });
		},
		isProtected: false,
		successMessage: "Signed in successfully",
		errorMessage: "Sign in failed",
	});
}
