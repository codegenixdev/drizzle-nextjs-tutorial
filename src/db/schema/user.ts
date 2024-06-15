import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { post } from "@/db/schema/post";

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
}));

// const insertUserSchema = createInsertSchema(users, {
// 	role: z.string(),
// });

// const insertUserSchema = createInsertSchema(users, {
// 	id: (schema) => schema.id.positive(),
// 	email: (schema) => schema.email.email(),
// 	role: z.string(),
// });

// const requestSchema = insertUserSchema.pick({ name: true, email: true });
