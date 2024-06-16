import { db, DBType } from "@/db";
import { comment, InsertCommentSchema } from "@/db/schema";
import { faker } from "@faker-js/faker";

const parentCommentsMock = async () => {
	const [postsData, usersData] = await Promise.all([
		db.query.post.findMany(),
		db.query.user.findMany(),
	]);

	const randomPosts = faker.helpers.arrayElements(postsData);

	const data: InsertCommentSchema[] = randomPosts.map((post) => ({
		content: faker.lorem.sentences(),
		postId: post.id,
		userId: faker.helpers.arrayElement(usersData).id,
	}));

	return data;
};

const childCommentsMock = async () => {
	const [commentsData, usersData] = await Promise.all([
		db.query.comment.findMany(),
		db.query.user.findMany(),
	]);

	const randomComments = faker.helpers.arrayElements(commentsData);

	const data: InsertCommentSchema[] = randomComments.map((comment) => ({
		content: faker.lorem.sentences(),
		postId: comment.postId,
		userId: faker.helpers.arrayElement(usersData).id,
		parentId: comment.id,
	}));
	return data;
};

export async function seed(db: DBType) {
	const parentCommentsData = await parentCommentsMock();
	await db.insert(comment).values(parentCommentsData);

	const childCommentsData = await childCommentsMock();
	await db.insert(comment).values(childCommentsData);
}
