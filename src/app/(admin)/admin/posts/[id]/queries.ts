import { wait } from "@/lib/utils";

export async function getPostById(id: number) {
	await wait();
	return {
		id: 1,
		userId: 1,
		title: "mock title",
		shortDescription: "mock short description",
		content: "mock content",
		categoryId: 1,
		tags: [
			{
				postId: 1,
				tagId: 1,
			},
		],
	};
}
