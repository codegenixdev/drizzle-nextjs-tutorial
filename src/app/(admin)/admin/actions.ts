"use server";

import { UserSchema } from "@/db/schema/user";
import { wait } from "@/lib/utils";

export async function updateUser(data: UserSchema) {
	await wait();
	return { success: true, message: "User updated successfully" };
}
