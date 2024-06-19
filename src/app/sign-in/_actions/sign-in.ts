"use server";

import { isRedirectError } from "next/dist/client/components/redirect";

import { signIn as authSignIn } from "@/auth";
import { UserSchema, userSchema } from "@/db/schema";
import { getErrorMessage } from "@/lib/utils";

export async function signIn(data: UserSchema) {
	const validated = userSchema.safeParse(data);

	if (!validated.success) {
		return {
			success: false,
			message: "Invalid data",
		};
	}

	try {
		await authSignIn("credentials", { ...data, redirectTo: "/" });
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		return {
			success: false,
			message: getErrorMessage(error),
		};
	}

	return { success: true, message: "You signed in successfully." };
}
