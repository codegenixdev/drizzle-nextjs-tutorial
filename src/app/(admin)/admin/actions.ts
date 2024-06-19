"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { user, userSchema, UserSchema } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";

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
	});
}
