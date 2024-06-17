import { InferSelectModel, relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { category, comment, postToTag, user } from "@/db/schema";

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

export const postRelations = relations(post, ({ one, many }) => ({
	user: one(user, {
		fields: [post.userId],
		references: [user.id],
	}),
	tags: many(postToTag),
	comments: many(comment),
	category: one(category, {
		fields: [post.categoryId],
		references: [category.id],
	}),
}));

export const postSchema = createInsertSchema(post, {
	title: (schema) => schema.title.min(1),
	shortDescription: (schema) => schema.shortDescription.min(1).max(255),
	userId: (schema) => schema.userId.min(1),
	categoryId: (schema) => schema.categoryId.min(1),
}).and(
	z.object({
		tagIds: z.array(z.number()).min(1),
	})
);

export type PostSchema = z.infer<typeof postSchema>;
export type SelectPostModel = InferSelectModel<typeof post>;
