"use server";

import { CommentSchema } from "@/db/schema/comment";
import { wait } from "@/lib/utils";

export async function createComment(data: CommentSchema) {
	await wait();
	return { success: true, message: "Comment created successfully" };
}
