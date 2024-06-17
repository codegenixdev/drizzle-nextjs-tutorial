import { eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";

export async function getPostById(id: number) {
	return await db.query.post.findFirst({
		where: eq(post.id, id),
		with: { tags: true },
	});
}
