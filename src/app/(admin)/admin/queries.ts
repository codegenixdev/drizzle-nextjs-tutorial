import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getCurrentUser() {
	const session = await auth();

	const sessionUserId = session?.user?.id;

	if (!sessionUserId) return null;

	return executeQuery({
		queryFn: async () =>
			await db.query.user.findFirst({ where: eq(user.id, +sessionUserId) }),
		serverErrorMessage: "getCurrentUser",
		isProtected: false,
	});
}
