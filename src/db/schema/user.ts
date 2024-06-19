import { InferSelectModel, relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { post } from "@/db/schema/post";

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	fullName: varchar("fullName", { length: 255 }).notNull(),
	age: integer("age").notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
}));

export type SelectUserModel = InferSelectModel<typeof user>;
export const userSchema = createInsertSchema(user, {
	fullName: (schema) => schema.fullName.min(1),
	password: (schema) => schema.password.min(1),
	age: z.coerce.number().min(18).max(99),
	email: (schema) => schema.email.min(1),
}).pick({ fullName: true, password: true, age: true, email: true });

export type UserSchema = z.infer<typeof userSchema>;

// const insertUserSchema = createInsertSchema(users, {
// 	role: z.string(),
// });

// const insertUserSchema = createInsertSchema(users, {
// 	id: (schema) => schema.id.positive(),
// 	email: (schema) => schema.email.email(),
// 	role: z.string(),
// });

// const requestSchema = insertUserSchema.pick({ name: true, email: true });
