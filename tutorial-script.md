## Script
Add post status enum table

check script
add additional description that why are we doing some of the things

## Video Script

tutorial is fully focused on backend, sql and drizzle and if you are a backend developer you can completely follow the tutorial
i don't want you to learn frontend here but for you to better understand the possibilities of drizzle orm with real world example and save time, i prepared only a frontend app template that relies on mock data only. there is no real backend or database here currently. we're gonna replace the mock with real in this tutorial.

if you want to follow:

```bash
git clone -b frontend https://github.com/codegenixdev/drizzle-nextjs-tutorial.git
```

show .nvmrc

select typescript workspace version

```bash
npm i && npm run dev
```

showcase (show all pages and operations, what tech used, versions, folder structure, controllers)

everything is mocked also sign up and login

we will only change actions and queries file to replace the mock data with real database data and auth. so the only part that you will be concerned is how to communicate with the database in the most safe type way.

we need to choose a sql database, my choice here is postgres but you are free to use anything else like mysql and other sql

we docker to run postgres and sql management dashboard. you can also use any other way to setup db and admin servers

install and run docker

first create a .env file and copy the content of sample or write your own env here

```bash
cp .env.sample .env
```

explain dotenv-expand

```typescript env.ts
const envSchema = z.object({
+	DB_HOST: z.string().min(1),
+	DB_USER: z.string().min(1),
+	DB_PASSWORD: z.string().min(1),
+	DB_NAME: z.string().min(1),
+	DB_PORT: z.coerce.number().min(1),
+ DATABASE_URL: z.string().min(1),
	AUTH_SECRET: z.string().min(1),
	AUTH_TRUST_HOST: z.string().min(1),
});
```

create docker-compose.yml (and paste)

```bash
npm i drizzle-orm drizzle-zod
```

we need to choose our chosen sql client (show docs)

```bash
npm i pg
```

```bash
npm i -D @types/pg drizzle-kit eslint-plugin-drizzle @typescript-eslint/eslint-plugin @typescript-eslint/parser tsx
```

### Show tsconfig.json

```json
"paths": {
	"@/*": ["./src/*"],
	"$/*": ["./*"]
}
```

### Update Eslint

```json
{
	"root": true,
	"extends": ["next/core-web-vitals"],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"project": "./tsconfig.json"
	}
}
```

`@/db`
`@/db/schema`
`@/db/schema/index.ts`

```typescript $/drizzle.config.ts
import { defineConfig } from "drizzle-kit";

import env from "@/lib/env";

export default defineConfig({
	schema: "./src/db/schema/index.ts",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	// verbose: true,
	strict: true,
});
```

show the database diagram

## Schema

`@/db/schema/category.ts`
`@/db/schema/comment.ts`
`@/db/schema/post.ts`
`@/db/schema/tag.ts`
`@/db/schema/user.ts`

### user.ts

```typescript
export const user = pgTable("user", {
	id: serial("id").notNull().primaryKey(),
	fullName: varchar("fullName", { length: 255 }).notNull(),
	age: integer("age").notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
```

### category.ts

```typescript
export const category = pgTable("category", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull().unique(),
});
```

### post.ts

```typescript
export const post = pgTable("post", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => user.id),
	title: varchar("title", { length: 255 }).notNull(),
	shortDescription: text("short_description"),
	content: text("content").notNull(),
	categoryId: integer("category_id")
		.references(() => category.id)
		.notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
```

### comment.ts

```typescript
export const comment = pgTable("comment", {
	id: serial("id").primaryKey(),
	parentId: integer("parent_id").references((): AnyPgColumn => comment.id),

	userId: integer("user_id")
		.references(() => user.id)
		.notNull(),
	content: text("content").notNull(),
	postId: integer("post_id").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
```

### tag.ts

```typescript
export const tag = pgTable("tag", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull().unique(),
});
```

## Relations

### user.ts

```typescript
export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
}));
```

### category.ts

```typescript
export const categoryRelations = relations(category, ({ many }) => ({
	posts: many(post),
}));
```

### comment.ts

```typescript
export const commentRelations = relations(comment, ({ one }) => ({
	user: one(user, {
		fields: [comment.userId],
		references: [user.id],
	}),
	post: one(post, {
		fields: [comment.postId],
		references: [post.id],
	}),
}));
```

`@/db/schema/postTags.ts`

### postTags.ts

```typescript
export const postTags = pgTable(
	"post_to_tag",
	{
		postId: integer("post_id")
			.notNull()
			.references(() => post.id),
		tagId: integer("tag_id")
			.notNull()
			.references(() => tag.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.postId, table.tagId] }),
	})
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
	tag: one(tag, { fields: [postTags.tagId], references: [tag.id] }),
	post: one(post, { fields: [postTags.postId], references: [post.id] }),
}));
```

### tag.ts

```typescript
export const tagRelations = relations(tag, ({ many }) => ({
	postToTag: many(postTags),
}));
```

### post.ts

```typescript
export const postRelations = relations(post, ({ one, many }) => ({
	user: one(user, {
		fields: [post.userId],
		references: [user.id],
	}),
	tags: many(postTags),
	comments: many(comment),
	category: one(category, {
		fields: [post.categoryId],
		references: [category.id],
	}),
}));
```

## Insert Schemas

### category.ts

```typescript
export const categorySchema = createInsertSchema(category);
export type CategorySchema = z.infer<typeof categorySchema>;
```

### tag.ts

```typescript
const tagSchema = createInsertSchema(tag);
export type TagSchema = z.infer<typeof tagSchema>;
```

### postTags.ts

```typescript
const postTagsSchema = createInsertSchema(postTags);
export type PostTagsSchema = z.infer<typeof postTagsSchema>;
```

### comment.ts

```typescript
export const commentSchema = createInsertSchema(comment, {
	postId: (schema) => schema.postId.min(1),
	content: (schema) => schema.content.min(1),
	userId: (schema) => schema.userId.min(1),
}).pick({
	postId: true,
	content: true,
	parentId: true,
	userId: true,
	id: true,
});
export type CommentSchema = z.infer<typeof commentSchema>;
```

### post.ts

```typescript
const baseSchema = createInsertSchema(post, {
	title: (schema) => schema.title.min(1),
	shortDescription: (schema) => schema.shortDescription.min(1).max(255),
	userId: (schema) => schema.userId.min(1),
	categoryId: (schema) => schema.categoryId.min(1),
}).pick({
	title: true,
	shortDescription: true,
	userId: true,
	categoryId: true,
	content: true,
});

export const postSchema = z.union([
	z.object({
		mode: z.literal("create"),
		title: baseSchema.shape.title,
		shortDescription: baseSchema.shape.shortDescription,
		userId: baseSchema.shape.userId,
		categoryId: baseSchema.shape.categoryId,
		content: baseSchema.shape.content,
		tagIds: z.array(z.number()),
	}),
	z.object({
		mode: z.literal("edit"),
		id: z.number().min(1),
		title: baseSchema.shape.title,
		shortDescription: baseSchema.shape.shortDescription,
		userId: baseSchema.shape.userId,
		categoryId: baseSchema.shape.categoryId,
		content: baseSchema.shape.content,
		tagIds: z.array(z.number()),
	}),
]);

export type PostSchema = z.infer<typeof postSchema>;
export type SelectPostModel = InferSelectModel<typeof post>;
```

### @/app/(admin)/admin/posts/\_components/posts-table.tsx

```typescript
rows: SelectPostModel[] | null;
```

### @/app/(public)/\_components/post-cards.tsx

```typescript
type Props = {
	data:
		| Pick<SelectPostModel, "id" | "title" | "updatedAt" | "shortDescription">[]
		| null;
};
```

### user.ts

```typescript
const baseSchema = createInsertSchema(user, {
	fullName: (schema) => schema.fullName.min(1),
	password: (schema) => schema.password.min(1),
	age: z.coerce.number().min(18).max(99),
	email: (schema) => schema.email.email(),
}).pick({ fullName: true, password: true, age: true, email: true });

export const userSchema = z.union([
	z.object({
		mode: z.literal("signUp"),
		email: baseSchema.shape.email,
		password: baseSchema.shape.password,
		fullName: baseSchema.shape.fullName,
		age: baseSchema.shape.age,
	}),
	z.object({
		mode: z.literal("signIn"),
		email: baseSchema.shape.email,
		password: baseSchema.shape.password,
	}),
	z.object({
		mode: z.literal("update"),
		fullName: baseSchema.shape.fullName,
		age: baseSchema.shape.age,
		id: z.number().min(1),
	}),
]);

export type UserSchema = z.infer<typeof userSchema>;
export type SelectUserModel = InferSelectModel<typeof user>;
```

### @/app/\_components/user-avatar.tsx

```typescript
type Props = {
	data?: Pick<SelectUserModel, "id" | "fullName">;
	href?: string;
};
```

### post-form.tsx

### comment-reply-form.tsx

### user-form.tsx

fix any types, resolver and submit

### @/db/schema/index.ts

```typescript
export { category, categoryRelations } from "@/db/schema/category";
export { comment, commentRelations } from "@/db/schema/comment";
export { post, postRelations } from "@/db/schema/post";
export { tag, tagRelations } from "@/db/schema/tag";
export { user, userRelations } from "@/db/schema/user";
export { postTags, postTagsRelations } from "@/db/schema/postTags";
```

### @/db/index.ts

```typescript
import * as schema from "@/db/schema";
import env from "@/lib/env";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, logger: true });

export type DB = typeof db;
```

now show what the db.query can do with type magic

### @/db/migrate.ts

```typescript
import config from "$/drizzle.config";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
	if (config.out) {
		await migrate(db, { migrationsFolder: config.out });
		console.log("Migration done!");
	}
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await pool.end();
	});
```

```json
"db:generate": "drizzle-kit generate",
"db:migrate": "tsx src/db/migrate.ts",
"db:update": "npm run db:generate && npm run db:migrate",
```

```bash
npm run db:generate
```

```bash
docker compose up
```

```bash
npm run db:migrate
```

if some weird issues during migrating, remove migration folder and do it again.
because in development the database schema might change a

or

```bash
npm run db:update
```

show added table

## Seeding

```bash
npm i -D @faker-js/faker
```

`@/db/seeds`
`@/db/seeds/category.ts`
`@/db/seeds/comment.ts`
`@/db/seeds/index.ts`
`@/db/seeds/post.ts`
`@/db/seeds/postTags.ts`
`@/db/seeds/tag.ts`
`@/db/seeds/user.ts`

### category.ts

```typescript
const mock: CategorySchema[] = [
	{
		name: "Node.js",
	},
	{
		name: "React",
	},
	{
		name: "Python",
	},
	{
		name: "Javascript",
	},
	{
		name: "Algorithms",
	},
	{
		name: "Devops",
	},
	{
		name: "APIs",
	},
];

export async function seed(db: DB) {
	await db.insert(category).values(mock);
}
```

### tag.ts

```typescript
const mock = () => {
	const data: TagSchema[] = [];

	for (let i = 0; i < 10; i++) {
		data.push({
			name: faker.lorem.word({ length: 15 }),
		});
	}

	return data;
};

export async function seed(db: DB) {
	await db.insert(tag).values(mock());
}
```

### user.ts

```typescript
const mock = () => {
	const data: Omit<Extract<UserSchema, { mode: "signUp" }>, "mode">[] = [];

	for (let i = 0; i < 20; i++) {
		data.push({
			fullName: faker.person.fullName(),
			password: faker.internet.password({ memorable: true, length: 4 }),
			age: faker.number.int({ min: 18, max: 99 }),
			email: faker.internet.email(),
		});
	}

	return data;
};

export async function seed(db: DB) {
	await db.insert(user).values(mock());
}
```

### post.ts

```typescript
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
```

### postTags.ts

```typescript
const mock = async () => {
	const [postsData, tagsData] = await Promise.all([
		db.query.post.findMany(),
		db.query.tag.findMany(),
	]);

	const randomPosts = faker.helpers.arrayElements(postsData);

	const data: PostTagsSchema[] = randomPosts.flatMap((post) => {
		const randomTags = faker.helpers.arrayElements(tagsData);
		return randomTags.map((tag) => ({ postId: post.id, tagId: tag.id }));
	});

	return data;
};

export async function seed(db: DB) {
	const insertData = await mock();
	await db.insert(postTags).values(insertData);
}
```

### comment.ts

```typescript
const parentCommentsMock = async () => {
	const [postsData, usersData] = await Promise.all([
		db.query.post.findMany(),
		db.query.user.findMany(),
	]);

	const randomPosts = faker.helpers.arrayElements(postsData);

	const data: CommentSchema[] = randomPosts.map((post) => ({
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

	const data: CommentSchema[] = randomComments.map((comment) => ({
		content: faker.lorem.sentences(),
		postId: comment.postId,
		userId: faker.helpers.arrayElement(usersData).id,
		parentId: comment.id,
	}));
	return data;
};

export async function seed(db: DB) {
	const parentCommentsData = await parentCommentsMock();
	await db.insert(comment).values(parentCommentsData);

	const childCommentsData = await childCommentsMock();
	await db.insert(comment).values(childCommentsData);
}
```

### index.ts

```typescript
export { seed as category } from "@/db/seeds/category";
export { seed as user } from "@/db/seeds/user";
export { seed as tag } from "@/db/seeds/tag";
export { seed as post } from "@/db/seeds/post";
export { seed as postTags } from "@/db/seeds/postTags";
export { seed as comment } from "@/db/seeds/comment";
```

`@/db/seed.ts`

### seed.ts

```typescript
import { sql, Table } from "drizzle-orm";

import { db, DB } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "@/db/seeds";

async function resetTable(db: DB, table: Table) {
	return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
	for (const table of [
		schema.category,
		schema.user,
		schema.tag,
		schema.post,
		schema.postTags,
		schema.comment,
	]) {
		await resetTable(db, table);
	}
	await seeds.category(db);
	await seeds.user(db);
	await seeds.tag(db);
	await seeds.post(db);
	await seeds.postTags(db);
	await seeds.comment(db);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Seeding done!");
		process.exit(0);
	});
```

```json
"db:seed": "tsx src/db/seed.ts"
```

```bash
npm run db:seed
```

show db

if some changes to schema, you must do migrate and you can run seed file again to populate.

check everything is working but mocked

## Replacing Mock with Real

### @/app/queries.ts

```typescript
export async function getCategories() {
	return await db.query.category.findMany();
}
```

check new categories added

i don't like this way of handling queries for each

`@/db/utils/executeQuery.ts`
`@/db/utils/executeAction.ts`

### executeQuery.ts

```typescript
type Options<T> = {
	queryFn: {
		(): Promise<T>;
	};
	serverErrorMessage?: string;
	isProtected?: boolean;
};

export async function executeQuery<T>({
	queryFn,
	serverErrorMessage = "Error executing query",
	isProtected = true,
}: Options<T>) {
	try {
		if (isProtected) {
			const session = await auth();
			if (!session) throw new Error("Not authorized");
		}
		return await queryFn();
	} catch (error) {
		console.error(serverErrorMessage, error);
		return null;
	}
}
```

### executeAction.ts

```typescript
type Options<T> = {
	actionFn: {
		(): Promise<T>;
	};
	isProtected?: boolean;
	serverErrorMessage?: string;
	clientSuccessMessage?: string;
};

export async function executeAction<T>({
	actionFn,
	isProtected = true,
	serverErrorMessage = "Error executing action",
	clientSuccessMessage = "Operation was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> {
	try {
		if (isProtected) {
			const session = await auth();
			if (!session) throw new Error("Not authorized");
		}
		await actionFn();
		return {
			success: true,
			message: clientSuccessMessage,
		};
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}
		console.error(serverErrorMessage, error);
		return {
			success: false,
			message: getErrorMessage(error),
		};
	}
}
```

always try to check user authorization as close as to the database

### @/app/queries.ts

```typescript
export async function getCategories() {
	return executeQuery({
		queryFn: async () => await db.query.category.findMany(),
		serverErrorMessage: "getCategories",
		isProtected: false,
	});
}

export async function getTags() {
	return executeQuery({
		queryFn: async () => await db.query.tag.findMany(),
		serverErrorMessage: "getTags",
		isProtected: false,
	});
}

export async function getRelatedPostsByCategoryId(categoryId: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findMany({
				limit: 4,
				where: eq(post.categoryId, categoryId),
				columns: {
					id: true,
					title: true,
					updatedAt: true,
					shortDescription: true,
				},
			}),
		serverErrorMessage: "getRelatedPostsByCategoryId",
		isProtected: false,
	});
}

export async function getPostsCount(searchTerm?: string) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.where(ilike(post.title, `%${searchTerm || ""}%`))
				.then((res) => res[0].count),
		serverErrorMessage: "getPostsCount",
		isProtected: false,
	});
}

export async function getPosts(
	page: number,
	limit: number,
	searchTerm?: string
) {
	return executeQuery({
		queryFn: async () =>
			db
				.select()
				.from(post)
				.orderBy(desc(post.createdAt))
				.limit(limit)
				.offset(page * limit)
				.where(ilike(post.title, `%${searchTerm || ""}%`)),

		serverErrorMessage: "getPosts",
		isProtected: false,
	});
}

export async function getUserPostsCount(userId: number) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({ count: count() })
				.from(post)
				.where(eq(post.userId, userId))
				.then((res) => res[0].count),
		serverErrorMessage: "getUserPostsCount",
		isProtected: false,
	});
}

export async function getUserPosts({
	limit,
	page,
	userId,
}: {
	limit: number;
	page: number;
	userId: number;
}) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findMany({
				where: eq(post.userId, userId),
				limit,
				offset: limit * page,
				orderBy: [desc(post.createdAt)],
			}),
		serverErrorMessage: "getUserPosts",
		isProtected: false,
	});
}

export async function getUser(userId: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.user.findFirst({
				columns: { fullName: true, email: true, id: true },
				where: eq(user.id, userId),
			}),
		serverErrorMessage: "getUser",
		isProtected: false,
	});
}
```

### @/app/actions.ts

```typescript
export async function signOut() {
	return executeAction({
		actionFn: async () => {
			await authSignOut();
		},
		isProtected: false,
		clientSuccessMessage: "Sign out successfully",
		serverErrorMessage: "signOut",
	});
}
```

### @/app/sign-up/actions.ts

```typescript
export async function signUp(data: UserSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = userSchema.parse(data);
			if (validatedData.mode === "signUp") {
				await db.insert(user).values(validatedData);
				redirect("/sign-in");
			}
		},
		isProtected: false,

		clientSuccessMessage: "Signed up successfully",
		serverErrorMessage: "signUp",
	});
}
```

### @/app/sign-in/actions.ts

```typescript
export async function signIn(data: UserSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = userSchema.parse(data);
			await authSignIn("credentials", { ...validatedData, redirectTo: "/" });
		},
		isProtected: false,
		clientSuccessMessage: "Signed in successfully",
		serverErrorMessage: "signIn",
	});
}
```

### @/app/sign-in/queries.ts

```typescript
export async function getUserByEmailAndPassword(data: unknown) {
	return executeQuery({
		queryFn: async () => {
			const validatedData = userSchema.parse(data);
			if (validatedData.mode === "signIn") {
				return (
					await db
						.select()
						.from(user)
						.where(
							and(
								eq(user.password, validatedData.password),
								eq(user.email, validatedData.email)
							)
						)
				)[0];
			}
		},
		isProtected: false,
		serverErrorMessage: "getUserByEmailAndPassword",
	});
}
```

### @/lib/auth.ts

```typescript
			authorize: async (credentials) => {
				const dbUser = await getUserByEmailAndPassword(credentials);
				if (!dbUser) {
					throw new Error("User not found / Wrong credentials");
				}

				return { ...dbUser, id: dbUser.id.toString() };
			},
```

never ever try to do auth like this (hash pass...)

### @/app/(public)/posts/[id]/actions.ts

```typescript
export async function createComment(data: CommentSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = commentSchema.parse(data);
			await db.insert(comment).values(validatedData);
			revalidatePath(`/posts/${validatedData.id}`);
		},
		isProtected: true,
		clientSuccessMessage: "Comment created successfully",
		serverErrorMessage: "createComment",
	});
}
```

### @/app/(public)/posts/[id]/queries.ts

```typescript
export async function getPostById(id: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findFirst({
				where: eq(post.id, id),
				with: {
					category: true,
					user: {
						columns: { id: true, fullName: true },
					},
					comments: { with: { user: true } },
				},
			}),
		serverErrorMessage: "getPostById",
		isProtected: false,
	});
}
```

### @/app/(public)/categories/[id]/queries.ts

```typescript
export async function getCategoryPostsCount(categoryId: number) {
	return executeQuery({
		queryFn: async () =>
			(
				await db
					.select({ count: count() })
					.from(post)
					.where(eq(post.categoryId, categoryId))
			)[0].count,
		isProtected: false,
	});
}

export async function getPostsByCategoryId(
	page: number,
	limit: number,
	categoryId: number
) {
	return executeQuery({
		queryFn: async () =>
			await db
				.select({
					id: post.id,
					title: post.title,
					shortDescription: post.shortDescription,
					updatedAt: post.updatedAt,
				})
				.from(post)
				.offset(page * limit)
				.limit(limit)
				.where(eq(post.categoryId, categoryId))
				.orderBy(desc(post.createdAt)),

		serverErrorMessage: "getCategoryPostsCount",
		isProtected: false,
	});
}
```

### @/app/(admin)/admin/queries.ts

```typescript
export async function getCurrentUser() {
	const session = await auth();

	const sessionUserId = session?.user?.id;

	if (!sessionUserId) return null;

	return executeQuery({
		queryFn: async () =>
			await db.query.user.findFirst({ where: eq(user.id, +sessionUserId) }),
		serverErrorMessage: "getCurrentUser",
		isProtected: false,
	});
}
```

### @/app/(admin)/admin/actions.ts

```typescript
export async function updateUser(data: UserSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = userSchema.parse(data);
			if (validatedData.mode === "update") {
				await db.update(user).set(data).where(eq(user.id, +validatedData.id));
				revalidatePath("/admin");
			}
		},
		isProtected: true,
		clientSuccessMessage: "User updated successfully",
		serverErrorMessage: "updateUser",
	});
}
```

### @/app/(admin)/admin/posts/actions.ts

```typescript
export async function deletePostById(id: number) {
	return executeAction({
		actionFn: async () => {
			await db.delete(postTags).where(eq(postTags.postId, id));
			await db.delete(post).where(eq(post.id, id));
			revalidatePath("/admin/posts");
		},
		isProtected: true,
		clientSuccessMessage: "Post deleted successfully",
		serverErrorMessage: "deletePostById",
	});
}
```

### @/app/(admin)/admin/posts/create/actions.ts

```typescript
export async function createPost(data: PostSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = postSchema.parse(data);

			const { postId } = (
				await db
					.insert(post)
					.values(validatedData)
					.returning({ postId: post.id })
			)[0];

			if (validatedData.tagIds.length > 0) {
				await db.insert(postTags).values(
					validatedData.tagIds.map((tagId) => ({
						postId: validatedData.id!,
						tagId,
					}))
				);
			}

			revalidatePath("/admin/posts");
		},
		isProtected: true,
		clientSuccessMessage: "Post created successfully",
		serverErrorMessage: "createPost",
	});
}

export async function updatePost(data: PostSchema) {
	return executeAction({
		actionFn: async () => {
			const validatedData = postSchema.parse(data);

			if (validatedData.mode === "edit") {
				await db
					.update(post)
					.set(validatedData)
					.where(eq(post.id, +validatedData.id));

				await db.delete(postTags).where(eq(postTags.postId, +validatedData.id));

				await db.insert(postTags).values(
					validatedData.tagIds.map((tagId) => ({
						postId: validatedData.id!,
						tagId,
					}))
				);
			}

			revalidatePath("/admin/posts");
		},
		isProtected: true,
		clientSuccessMessage: "Post updated successfully",
		serverErrorMessage: "updatePost",
	});
}
```

### @/app/(admin)/admin/posts/[id]/queries.ts

```typescript
export async function getPostById(id: number) {
	return executeQuery({
		queryFn: async () =>
			await db.query.post.findFirst({
				columns: {
					id: true,
					title: true,
					shortDescription: true,
					userId: true,
					categoryId: true,
					content: true,
				},
				where: eq(post.id, id),
				with: { tags: true },
			}),
		serverErrorMessage: "getPostById",
	});
}
```
