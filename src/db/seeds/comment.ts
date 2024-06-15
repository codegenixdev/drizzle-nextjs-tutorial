import { isNotNull } from "drizzle-orm";

import { db, DBType } from "@/db";
import { comment, InsertCommentSchema } from "@/db/schema";
import { faker } from "@faker-js/faker";

const rootParentCommentsMock = async () => {
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

const parentCommentsMock = async () => {
	const [commentsData, usersData] = await Promise.all([
		db.query.comment.findMany(),
		db.query.user.findMany(),
	]);

	const randomComments = faker.helpers.arrayElements(commentsData);

	const data: InsertCommentSchema[] = randomComments.map((comment) => ({
		content: faker.lorem.sentences(),
		postId: comment.postId,
		userId: faker.helpers.arrayElement(usersData).id,
		parentRootId: comment.id,
	}));
	return data;
};

const childCommentsMock = async () => {
	const [parentCommentsData, usersData] = await Promise.all([
		db.select().from(comment).where(isNotNull(comment.parentRootId)),
		db.query.user.findMany(),
	]);

	const randomParentComments = faker.helpers.arrayElements(parentCommentsData);

	const data: InsertCommentSchema[] = randomParentComments.map((comment) => ({
		content: faker.lorem.sentences(),
		postId: comment.postId,
		userId: faker.helpers.arrayElement(usersData).id,
		parentRootId: comment.id,
		parentId: comment.parentRootId,
	}));

	return data;
};

export async function seed(db: DBType) {
	const rootParentCommentsData = await rootParentCommentsMock();
	await db.insert(comment).values(rootParentCommentsData);

	const parentCommentsData = await parentCommentsMock();
	await db.insert(comment).values(parentCommentsData);

	const childCommentsData = await childCommentsMock();
	await db.insert(comment).values(childCommentsData);
}
