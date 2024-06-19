import { eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getPostById(id: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findFirst({
				columns: {
					id: true,
					title: true,
					shortDescription: true,
					userId: true,
					categoryId: true,
					content: true,
				},
				where: eq(post.id, id),
				with: { tags: true },
			}),
		serverErrorMessage: "getPostById",
	});
}
