"use server";

import { signIn as authSignIn } from "@/lib/auth";

export async function signIn(data: unknown) {
	await authSignIn("credentials", { redirectTo: "/" });
	return { success: true, message: "Signed in successfully" };
}
