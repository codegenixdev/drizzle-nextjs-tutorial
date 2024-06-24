"use server";

import { wait } from "@/lib/utils";

export async function createComment(data: unknown) {
	await wait();
	return { success: true, message: "Comment created successfully" };
}
