import { relations } from "drizzle-orm";
import {
	AnyPgColumn,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { post } from "@/db/schema/post";
import { user } from "@/db/schema/user";

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

export const commentRelations = relations(comment, ({ one, many }) => ({
	user: one(user, {
		fields: [comment.userId],
		references: [user.id],
	}),
	post: one(post, {
		fields: [comment.postId],
		references: [post.id],
	}),
}));

export const insertCommentSchema = createInsertSchema(comment);
export type InsertCommentSchema = z.infer<typeof insertCommentSchema>;
