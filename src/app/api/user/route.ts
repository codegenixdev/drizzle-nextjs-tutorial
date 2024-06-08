import { ne } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET() {
	const result = await db.select().from(users).where(ne(users.id, 1));

	return new Response(JSON.stringify(result));
}
