"use server";

import { UserSchema } from "@/db/schema/user";
import { signIn as authSignIn } from "@/lib/auth";

export async function signIn(data: UserSchema) {
	await authSignIn("credentials", { redirectTo: "/" });
	return { success: true, message: "Signed in successfully" };
}
