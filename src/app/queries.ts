import { count, eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getCategories() {
	return executeQuery({
		queryFn: async () => await db.query.category.findMany(),
		serverErrorMessage: "getCategories",
	});
}

export async function getTags() {
	return executeQuery({
		queryFn: async () => await db.query.tag.findMany(),
		serverErrorMessage: "getTags",
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
		serverErrorMessage: "getLatestPosts",
		isProtected: false,
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
		serverErrorMessage: "getRelatedPostsByCategoryId",
	});
}

export async function getPostsCount() {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.then((res) => res[0].count),
		serverErrorMessage: "getPostsCount",
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
		serverErrorMessage: "getPosts",
	});
}
