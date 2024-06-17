import { limit } from "@/constants";
import { db } from "@/db";
import { post } from "@/db/schema";

export async function getPostsByUser({ offset }: { offset: number }) {
	return await db.query.post.findMany({
		limit,
		offset,
		orderBy: post.id,
	});
}
