import { DBType } from "@/db";
import { tag } from "@/db/schema";
import { InsertTagSchema } from "@/db/schema/tag";
import { faker } from "@faker-js/faker";

const mock = () => {
	const data: InsertTagSchema[] = [];

	for (let i = 0; i < 5; i++) {
		data.push({
			name: faker.lorem.word(),
		});
	}

	return data;
};

export async function seed(db: DBType) {
	await db.insert(tag).values(mock());
}
