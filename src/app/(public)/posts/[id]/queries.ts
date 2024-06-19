import { eq } from "drizzle-orm";

import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getPostById(id: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findFirst({
				where: eq(post.id, id),
				with: {
					category: true,
					user: {
						columns: { id: true, fullName: true },
					},
					comments: { with: { user: true } },
				},
			}),
		serverErrorMessage: "getPostById",
	});
}
