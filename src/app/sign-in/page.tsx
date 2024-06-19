import { UserForm } from "@/app/_components/user-form";

export default function Page() {
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
