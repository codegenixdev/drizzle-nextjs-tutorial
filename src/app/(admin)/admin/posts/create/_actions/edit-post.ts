"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/services";
import { db } from "@/db";
import { post, PostSchema, postSchema, postToTag } from "@/db/schema";

export async function editPost(data: PostSchema) {
	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();

	const validation = postSchema.safeParse(data);

	if (!validation.success) {
		return {
			success: false,
			message: "Invalid data",
		};
	}

	if (data.id) {
		await db.update(post).set(data).where(eq(post.id, data.id));

		await db.delete(postToTag).where(eq(postToTag.postId, data.id));

		await db
			.insert(postToTag)
			.values(data.tagIds.map((tagId) => ({ postId: data.id!, tagId })));
	}

	revalidatePath("/admin/posts");

	return { success: true, message: "Post edited successfully." };
}
