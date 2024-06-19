import { count, eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getPostsCountByUserId(userId: number) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.where(eq(post.userId, userId))
				.then((res) => res[0].count),
		serverErrorMessage: "getPostsCountByUserId",
	});
}

export async function getPostsByUserId({
	limit,
	page,
	userId,
}: {
	limit: number;
	page: number;
	userId: number;
}) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findMany({
				where: eq(post.userId, userId),
				limit,
				offset: limit * page,
				orderBy: post.id,
			}),
		serverErrorMessage: "getPostsByUserId",
	});
}
