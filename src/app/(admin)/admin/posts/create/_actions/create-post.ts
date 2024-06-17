"use server";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/services";
import { db } from "@/db";
import { post, PostSchema, postSchema, postToTag } from "@/db/schema";

export async function createPost(data: PostSchema) {
	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();

	const validation = postSchema.safeParse(data);

	if (!validation.success) {
		return {
			success: false,
			message: "Invalid data",
		};
	}

	const { postId } = (
		await db.insert(post).values(data).returning({ postId: post.id })
	)[0];

	await db
		.insert(postToTag)
		.values(data.tagIds.map((tagId) => ({ postId, tagId })));

	revalidatePath("/admin/posts");

	return { success: true, message: "Post created successfully." };
}
