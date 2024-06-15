import { sql, Table } from "drizzle-orm";

import { db, DBType } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "@/db/seeds";

async function resetTable(db: DBType, table: Table) {
	return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
	for (const table of [
		schema.category,
		schema.user,
		schema.tag,
		schema.post,
		schema.postToTag,
		schema.comment,
	]) {
		await resetTable(db, table);
	}
	await seeds.category(db);
	await seeds.user(db);
	await seeds.tag(db);
	await seeds.post(db);
	await seeds.postToTag(db);
	await seeds.comment(db);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Seeding done!");
		process.exit(0);
	});
