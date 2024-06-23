"use server";

import { PostSchema } from "@/db/schema/post";
import { wait } from "@/lib/utils";

export async function createPost(data: PostSchema) {
	await wait();
	return { status: true, message: "Post created successfully" };
}

export async function updatePost(data: PostSchema) {
	await wait();
	return { success: true, message: "Post updated successfully" };
}
