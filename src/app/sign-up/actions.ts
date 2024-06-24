"use server";

import { redirect } from "next/navigation";

import { wait } from "@/lib/utils";

export async function signUp(data: unknown) {
	await wait();
	redirect("/sign-in");
	return { success: true, message: "Signed up successfully" };
}
