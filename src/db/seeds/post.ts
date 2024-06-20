import { db, DB } from "@/db";
import { post } from "@/db/schema";
import { PostSchema } from "@/db/schema/post";
import { faker } from "@faker-js/faker";

const mock = async () => {
	const [usersData, categoriesData] = await Promise.all([
		db.query.user.findMany(),
		db.query.category.findMany(),
	]);

	const data: Omit<
		Extract<PostSchema, { mode: "create" }>,
		"tagIds" | "mode"
	>[] = [];

	for (let i = 0; i < 100; i++) {
		data.push({
			title: faker.lorem.words(),
			content: faker.lorem.paragraphs(20, "<br/><br/>"),
			userId: faker.helpers.arrayElement(usersData).id,
			shortDescription: faker.lorem.sentence(),
			categoryId: faker.helpers.arrayElement(categoriesData).id,
		});
	}

	return data;
};

export async function seed(db: DB) {
	const insertData = await mock();
	await db.insert(post).values(insertData);
}
