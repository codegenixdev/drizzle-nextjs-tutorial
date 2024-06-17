import { eq } from "drizzle-orm";

import { db } from "@/db";
import { user } from "@/db/schema";

export async function getCurrentUser() {
	return await db.query.user.findFirst({ where: eq(user.id, 10) });
}
