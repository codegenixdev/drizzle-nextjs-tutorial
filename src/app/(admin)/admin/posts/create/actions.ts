"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { post, PostSchema, postSchema, postToTag } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";

export async function createPost(data: PostSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = postSchema.parse(data);

			const { postId } = (
				await db
					.insert(post)
					.values(validatedData)
					.returning({ postId: post.id })
			)[0];

			await db
				.insert(postToTag)
				.values(validatedData.tagIds.map((tagId) => ({ postId, tagId })));

			revalidatePath("/admin/posts");
		},
		isProtected: true,
		successMessage: "Post created successfully",
	});
}

export async function editPost(data: PostSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = postSchema.parse(data);

			if (data.id) {
				await db
					.update(post)
					.set(validatedData)
					.where(eq(post.id, +validatedData.id));

				await db
					.delete(postToTag)
					.where(eq(postToTag.postId, +validatedData.id));

				await db.insert(postToTag).values(
					validatedData.tagIds.map((tagId) => ({
						postId: validatedData.id!,
						tagId,
					}))
				);
			}

			revalidatePath("/admin/posts");
		},
		isProtected: true,
		successMessage: "Post edited successfully",
	});
}
