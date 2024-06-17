import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { post } from "@/db/schema/post";

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	fullName: varchar("fullName", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
}));

export type SelectUserModel = InferSelectModel<typeof user>;
const insertUserSchema = createInsertSchema(user);
export type InsertUserSchema = z.infer<typeof insertUserSchema>;

// const insertUserSchema = createInsertSchema(users, {
// 	role: z.string(),
// });

// const insertUserSchema = createInsertSchema(users, {
// 	id: (schema) => schema.id.positive(),
// 	email: (schema) => schema.email.email(),
// 	role: z.string(),
// });

// const requestSchema = insertUserSchema.pick({ name: true, email: true });
