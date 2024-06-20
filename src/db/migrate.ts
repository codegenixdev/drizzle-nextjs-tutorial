import config from "$/drizzle.config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

import env from "@/env";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
	if (config.out) {
		await migrate(db, { migrationsFolder: config.out });
	}
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await pool.end();
	});
