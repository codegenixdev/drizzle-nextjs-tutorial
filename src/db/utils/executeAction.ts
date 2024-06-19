import { isRedirectError } from "next/dist/client/components/redirect";

import { auth } from "@/auth";

type ActionFn<T> = {
	(...args: any[]): Promise<T>;
};

type Options<T> = {
	actionFn: ActionFn<T>;
	isProtected?: boolean;
	errorMessage?: string;
	successMessage?: string;
};

export async function executeAction<T>({
	actionFn,
	isProtected = true,
	errorMessage = "Error executing action",
	successMessage = "Success executing action",
}: Options<T>): Promise<{ success: boolean; message: string }> {
	try {
		if (isProtected) {
			const session = await auth();
			if (!session) throw new Error("You are not authorized");
		}
		await actionFn();
		return {
			success: true,
			message: successMessage,
		};
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		console.error(errorMessage, error);
		return {
			success: false,
			message: errorMessage,
		};
	}
}
