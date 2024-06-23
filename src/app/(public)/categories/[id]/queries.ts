import { wait } from "@/lib/utils";

export async function getCategoryPostsCount(categoryId: number) {
	await wait();
	return 1;
}

export async function getPostsByCategoryId(
	page: number,
	limit: number,
	categoryId: number
) {
	await wait();
	return [
		{
			id: 1,
			title: "mock title",
			shortDescription: "mock short description",
			updatedAt: "2024-06-23 16:05:26.954952",
		},
	];
}
