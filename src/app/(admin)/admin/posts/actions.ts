"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { post, postToTag } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";

export async function deletePostById(id: number) {
	return executeAction({
		actionFn: async () => {
			await db.delete(postToTag).where(eq(postToTag.postId, id));
			await db.delete(post).where(eq(post.id, id));
			revalidatePath("/admin/posts");
		},
		isProtected: true,
		successMessage: "Post deleted successfully",
	});
}
