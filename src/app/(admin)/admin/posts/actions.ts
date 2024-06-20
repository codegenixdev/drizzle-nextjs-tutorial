"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { post, postTags } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";

export async function deletePostById(id: number) {
	return executeAction({
		actionFn: async () => {
			await db.delete(postTags).where(eq(postTags.postId, id));
			await db.delete(post).where(eq(post.id, id));
			revalidatePath("/admin/posts");
		},
		isProtected: true,
		clientSuccessMessage: "Post deleted successfully",
		serverErrorMessage: "deletePostById",
	});
}
