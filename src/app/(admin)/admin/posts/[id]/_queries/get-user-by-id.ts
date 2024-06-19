import { eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";

export async function getPostById(id: number) {
	return await db.query.post.findFirst({
		columns: {
			id: true,
			title: true,
			shortDescription: true,
			userId: true,
			categoryId: true,
			content: true,
		},
		where: eq(post.id, id),
		with: { tags: true },
	});
}
