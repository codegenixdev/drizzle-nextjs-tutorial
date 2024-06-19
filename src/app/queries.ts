import { count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { post, user } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getCategories() {
	return executeQuery({
		queryFn: async () => await db.query.category.findMany(),
		serverErrorMessage: "getCategories",
		isProtected: false,
	});
}

export async function getTags() {
	return executeQuery({
		queryFn: async () => await db.query.tag.findMany(),
		serverErrorMessage: "getTags",
		isProtected: false,
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
				orderBy: [desc(post.createdAt)],
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
		isProtected: false,
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
		isProtected: false,
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
		isProtected: false,
	});
}

export async function getUserPostsCount(userId: number) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.where(eq(post.userId, userId))
				.then((res) => res[0].count),
		serverErrorMessage: "getUserPostsCount",
		isProtected: false,
	});
}

export async function getUserPosts({
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
				orderBy: [desc(post.createdAt)],
			}),
		serverErrorMessage: "getUserPosts",
		isProtected: false,
	});
}

export async function getUser(userId: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.user.findFirst({
				columns: { fullName: true, email: true, id: true },
				where: eq(user.id, userId),
			}),
		serverErrorMessage: "getUser",
		isProtected: false,
	});
}
