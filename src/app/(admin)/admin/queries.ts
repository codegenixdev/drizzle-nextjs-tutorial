import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";

export async function getCurrentUser() {
	const session = await auth();

	const sessionUserId = session?.user.id;

	if (sessionUserId) throw new Error("You are not authorized");
	current userrrrrrrrrrr session fixx

	return executeQuery({
		queryFn: async () =>
			await db.query.user.findFirst({ where: eq(user.id, session.user.id) }),
		errorMessage: "Error fetching current user",
		isProtected: false,
	});
}
