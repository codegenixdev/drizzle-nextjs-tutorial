import { count, desc, eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { post, user } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";
import { wait } from "@/lib/utils";

export async function getCategories() {
	return executeQuery({
		queryFn: async () => {
			await wait();
			return [
				{
					id: 1,
					name: "mock category",
				},
			];
		},
		serverErrorMessage: "getCategories",
		isProtected: false,
	});
}

export async function getTags() {
	return executeQuery({
		queryFn: async () => {
			await wait();
			return [{ id: 1, name: "mock tag" }];
		},
		serverErrorMessage: "getTags",
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

export async function getPostsCount(searchTerm?: string) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.where(ilike(post.title, `%${searchTerm || ""}%`))
				.then((res) => res[0].count),
		serverErrorMessage: "getPostsCount",
		isProtected: false,
	});
}

// await db.query.post.findMany({
// 	limit,
// 	offset: page * limit,
// 	orderBy: [desc(post.createdAt)],
// }),
export async function getPosts(
	page: number,
	limit: number,
	searchTerm?: string
) {
	return executeQuery({
		queryFn: async () =>
			db
				.select()
				.from(post)
				.orderBy(desc(post.createdAt))
				.limit(limit)
				.offset(page * limit)
				.where(ilike(post.title, `%${searchTerm || ""}%`)),

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
