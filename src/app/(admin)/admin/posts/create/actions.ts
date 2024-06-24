"use server";

import { wait } from "@/lib/utils";

export async function createPost(data: unknown) {
	await wait();
	return { success: true, message: "Post created successfully" };
}

export async function updatePost(data: unknown) {
	await wait();
	return { success: true, message: "Post updated successfully" };
}
