import { DBType } from "@/db";
import { user } from "@/db/schema";
import { InsertUserSchema } from "@/db/schema/user";
import { faker } from "@faker-js/faker";

const mock = () => {
	const data: InsertUserSchema[] = [];

	for (let i = 0; i < 20; i++) {
		data.push({
			fullName: faker.person.fullName(),
			password: faker.internet.password(),
		});
	}

	return data;
};

export async function seed(db: DBType) {
	await db.insert(user).values(mock());
}
