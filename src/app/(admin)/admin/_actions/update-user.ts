"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/services";
import { db } from "@/db";
import { user, userSchema, UserSchema } from "@/db/schema";

export async function updateUser(data: UserSchema) {
	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();

	const validation = userSchema.safeParse(data);

	if (!validation.success) {
		return {
			success: false,
			message: "Invalid data",
		};
	}

	await db.update(user).set(data).where(eq(user.id, currentUserData.id));

	revalidatePath("/admin");

	return { success: true, message: "User updated successfully." };
}
