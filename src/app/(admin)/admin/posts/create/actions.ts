"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { post, postTags } from "@/db/schema";
import { PostSchema, postSchema } from "@/db/schema/post";
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
				.insert(postTags)
				.values(validatedData.tagIds.map((tagId) => ({ postId, tagId })));

			revalidatePath("/admin/posts");
		},
		isProtected: true,
		clientSuccessMessage: "Post created successfully",
		serverErrorMessage: "createPost",
	});
}

export async function editPost(data: PostSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = postSchema.parse(data);

			if (validatedData.mode === "edit") {
				await db
					.update(post)
					.set(validatedData)
					.where(eq(post.id, +validatedData.id));

				await db.delete(postTags).where(eq(postTags.postId, +validatedData.id));

				await db.insert(postTags).values(
					validatedData.tagIds.map((tagId) => ({
						postId: validatedData.id!,
						tagId,
					}))
				);
			}

			revalidatePath("/admin/posts");
		},
		isProtected: true,
		clientSuccessMessage: "Post edited successfully",
		serverErrorMessage: "editPost",
	});
}
