import { db } from "@/db";

export async function getCategories() {
	return await db.query.category.findMany();
}
