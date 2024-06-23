import { wait } from "@/lib/utils";

export async function getPostById(id: number) {
	await wait();

	return {
		id: 1,
		createdAt: "2024-06-23 16:05:26.954952",
		updatedAt: "2024-06-23 16:05:26.954952",
		userId: 1,
		title: "mock title",
		shortDescription: "mock short description",
		content: "mock content",
		categoryId: 1,
		category: {
			id: 1,
			name: "mock category",
		},
		user: {
			id: 1,
			fullName: "mock full name",
		},

		comments: [
			{
				id: 1,
				parentId: null,
				userId: 1,
				content: "mock content",
				postId: 1,
				createdAt: "2024-06-23 16:05:26.954952",
				updatedAt: "2024-06-23 16:05:26.954952",
				user: { id: 1, fullName: "mock full name" },
			},
		],
	};
}
