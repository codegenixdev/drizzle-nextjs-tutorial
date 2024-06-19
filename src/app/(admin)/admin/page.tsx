import { notFound } from "next/navigation";

import { UserForm } from "@/app/_components/user-form";

export default async function Page() {
	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();

	return (
		<main className="space-y-3">
			<h1 className="text-2xl">Profile</h1>
			<UserForm
				defaultValues={{
					mode: "update",
					age: currentUserData.age,
					fullName: currentUserData.fullName,
				}}
			/>
		</main>
	);
}
