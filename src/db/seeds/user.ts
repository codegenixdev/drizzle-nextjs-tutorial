import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { DBType } from "@/db";
import { user } from "@/db/schema";
import { faker } from "@faker-js/faker";

const schema = createInsertSchema(user);
type Schema = z.infer<typeof schema>;

const mock = () => {
	const data: Schema[] = [];

	for (let i = 0; i < 20; i++) {
		data.push({
			name: faker.person.fullName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
		});
	}

	return data;
};

export async function seed(db: DBType) {
	await db.insert(user).values(mock());
}
