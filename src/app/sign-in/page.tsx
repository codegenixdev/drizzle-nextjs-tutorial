import { redirect } from "next/navigation";

import { UserForm } from "@/app/_components/user-form";
import { auth } from "@/auth";

export default async function Page() {
	const session = await auth();
	if (!!session) redirect("/");

	return (
		<main>
			<h1 className="text-2xl font-bold py-5">Sign in</h1>
			<UserForm
				defaultValues={{
					mode: "signIn",
					email: "",
					password: "",
				}}
			/>
		</main>
	);
}
