import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/db/schema";
import env from "@/lib/env";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

// TODO: logger true
export const db = drizzle(pool, { schema });

export type DB = typeof db;
