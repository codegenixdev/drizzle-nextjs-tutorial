"use server";

import { wait } from "@/lib/utils";

export async function updateUser(data: unknown) {
	await wait();
	return { success: true, message: "User updated successfully" };
}
