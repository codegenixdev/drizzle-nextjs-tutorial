"use server";

import { signOut as authSignOut } from "@/auth";
import { executeAction } from "@/db/utils/executeAction";

export async function signOut() {
	return executeAction({
		actionFn: async () => {
			await authSignOut();
		},
		isProtected: false,
		clientSuccessMessage: "Sign out successfully",
		serverErrorMessage: "signOut",
	});
}
