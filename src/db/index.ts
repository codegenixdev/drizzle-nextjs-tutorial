import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "@/db/schema";
import { registerService } from "@/db/utils/registerService";
import env from "@/env";

const client = new Client({
	connectionString: env.DATABASE_URL,
});

client.connect();

// TODO: logger true

export const db = registerService("db", () => drizzle(client, { schema }));

export type DBType = typeof db;
