"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { user, UserSchema, userSchema } from "@/db/schema";

export async function createUser(data: UserSchema) {
	const validation = userSchema.safeParse(data);

	if (!validation.success) {
		return {
			success: false,
			message: "Invalid data",
		};
	}

	await db.insert(user).values(data);

	revalidatePath("/");

	return { success: true, message: "You registered successfully." };
}
