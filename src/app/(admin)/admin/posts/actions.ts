"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { post, postToTag } from "@/db/schema";

export async function deletePostById(id: number) {
	await db.delete(postToTag).where(eq(postToTag.postId, id));
	await db.delete(post).where(eq(post.id, id));
	revalidatePath("/admin/posts");
}
