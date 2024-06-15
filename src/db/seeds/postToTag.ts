import { db, DBType } from "@/db";
import { InsertPostToTagSchema, postToTag } from "@/db/schema/postToTag";
import { faker } from "@faker-js/faker";

const mock = async () => {
	const [postsData, tagsData] = await Promise.all([
		db.query.post.findMany(),
		db.query.tag.findMany(),
	]);

	const randomPosts = faker.helpers.arrayElements(postsData);

	const data: InsertPostToTagSchema[] = randomPosts.flatMap((post) => {
		const randomTags = faker.helpers.arrayElements(tagsData);
		return randomTags.map((tag) => ({ postId: post.id, tagId: tag.id }));
	});

	return data;
};

export async function seed(db: DBType) {
	const insertData = await mock();
	await db.insert(postToTag).values(insertData);
}
