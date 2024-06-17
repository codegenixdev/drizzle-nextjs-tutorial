import { db } from "@/db";

export async function getTags() {
	return await db.query.tag.findMany();
}
