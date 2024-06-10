import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET() {
	// const result = await db.select().from(users).where(ne(users.id, 1));

	const result = await db.query.users.findFirst({
		with: {
			profile: true,
			posts: true,
		},
	});

	return new Response(JSON.stringify(result));
}
