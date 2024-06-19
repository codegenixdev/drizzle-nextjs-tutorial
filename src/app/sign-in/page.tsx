import { UserForm } from "@/app/_components/user-form";

export default function Page() {
	return (
		<UserForm
			defaultValues={{
				mode: "signIn",
				email: "",
				password: "",
			}}
		/>
	);
}
