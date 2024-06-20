import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { post, tag } from "@/db/schema";

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

const postTagsSchema = createInsertSchema(postTags);
export type PostTagsSchema = z.infer<typeof postTagsSchema>;
