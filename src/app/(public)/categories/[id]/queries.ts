import { count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getCategoryPostsCount(categoryId: number) {
	return executeQuery({
		queryFn: async () =>
			(
				await db
					.select({ count: count() })
					.from(post)
					.where(eq(post.categoryId, categoryId))
			)[0].count,
		isProtected: false,
	});
}

export async function getPostsByCategoryId(
	page: number,
	limit: number,
	categoryId: number
) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({
					id: post.id,
					title: post.title,
					shortDescription: post.shortDescription,
					updatedAt: post.updatedAt,
				})
				.from(post)
				.offset(page * limit)
				.limit(limit)
				.where(eq(post.categoryId, categoryId))
				.orderBy(desc(post.createdAt)),

		serverErrorMessage: "getCategoryPostsCount",
		isProtected: false,
	});
}
