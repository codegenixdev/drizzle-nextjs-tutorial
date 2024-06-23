"use server";

import { redirect } from "next/navigation";

import { UserSchema } from "@/db/schema/user";
import { wait } from "@/lib/utils";

export async function signUp(data: UserSchema) {
	await wait();
	redirect("/sign-in");
	return { success: true, message: "Signed up successfully" };
}
