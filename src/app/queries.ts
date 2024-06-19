import { count, eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getCategories() {
	return executeQuery({
		queryFn: async () => await db.query.category.findMany(),
		errorMessage: "Error fetching categories",
	});
}

export async function getTags() {
	return executeQuery({
		queryFn: async () => await db.query.tag.findMany(),
		errorMessage: "Error fetching tags",
	});
}

export async function getLatestPosts() {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findMany({
				limit: 4,
				columns: {
					id: true,
					title: true,
					updatedAt: true,
					shortDescription: true,
				},
			}),
		errorMessage: "Error fetching latest posts",
	});
}

export async function getRelatedPostsByCategoryId(categoryId: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findMany({
				limit: 4,
				where: eq(post.categoryId, categoryId),
				columns: {
					id: true,
					title: true,
					updatedAt: true,
					shortDescription: true,
				},
			}),
		errorMessage: "Error fetching latest posts",
	});
}

export async function getPostsCount() {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.then((res) => res[0].count),
	});
}

export async function getPosts(page: number, limit: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findMany({
				limit,
				offset: page * limit,
				orderBy: post.id,
			}),
	});
}
