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
	await migrate(db, { migrationsFolder: config.out! });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		process.exit();
	});
