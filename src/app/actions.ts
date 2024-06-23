"use server";

import { signOut as authSignOut } from "@/lib/auth";

export async function signOut() {
	await authSignOut();
	return { success: true, message: "Signed out successfully" };
}
