import { auth } from "@/lib/auth";
import { wait } from "@/lib/utils";

export async function getCurrentUser() {
	await wait();

	const session = await auth();

	if (!session) return null;
	return {
		id: 1,
		fullName: "mock full name",
		age: 18,
		password: "mock password",
		email: "mock-email@mock.com",
		createdAt: "2024-06-23 16:05:26.954952",
		updatedAt: "2024-06-23 16:05:26.954952",
	};
}
