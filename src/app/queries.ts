import { wait } from "@/lib/utils";

export async function getCategories() {
	await wait();
	return [
		{
			id: 1,
			name: "mock category",
		},
	];
}

export async function getTags() {
	await wait();
	return [{ id: 1, name: "mock tag" }];
}

export async function getRelatedPostsByCategoryId(categoryId: number) {
	await wait();
	return [
		{
			id: 1,
			updatedAt: "2024-06-23 16:05:26.954952",
			title: "mock title",
			shortDescription: "mock short description",
		},
	];
}

export async function getPostsCount(searchTerm?: string) {
	await wait();
	return 1;
}

export async function getPosts(
	page: number,
	limit: number,
	searchTerm?: string
) {
	await wait();
	return [
		{
			id: 1,
			updatedAt: "2024-06-23 16:05:26.954952",
			createdAt: "2024-06-23 16:05:26.954952",
			userId: 1,
			title: "mock title",
			shortDescription: "mock short description",
			content: "mock content",
			categoryId: 1,
		},
	];
}

export async function getUserPostsCount(userId: number) {
	await wait();
	return 1;
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
	await wait();
	return [
		{
			id: 1,
			createdAt: "2024-06-23 16:05:26.954952",
			updatedAt: "2024-06-23 16:05:26.954952",
			userId: 1,
			title: "mock title",
			shortDescription: "mock short description",
			content: "mock content",
			categoryId: 1,
		},
	];
}

export async function getUser(userId: number) {
	await wait();
	return {
		id: 1,
		fullName: "mock full name",
		email: "mock email",
	};
}
