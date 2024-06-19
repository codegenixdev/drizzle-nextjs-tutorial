"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { comment, CommentSchema, commentSchema } from "@/db/schema/comment";
import { executeAction } from "@/db/utils/executeAction";

export async function createComment(data: CommentSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = commentSchema.parse(data);
			await db.insert(comment).values(validatedData);
			revalidatePath(`/posts/${validatedData.id}`);
		},
		isProtected: true,
		clientSuccessMessage: "Comment created successfully",
		serverErrorMessage: "createComment",
	});
}
