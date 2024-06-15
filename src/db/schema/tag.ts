import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { postToTag } from "@/db/schema";

export const tag = pgTable("tag", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
});

export const tagRelations = relations(tag, ({ many }) => ({
	postToTag: many(postToTag),
}));

const insertTagSchema = createInsertSchema(tag);
export type InsertTagSchema = z.infer<typeof insertTagSchema>;
