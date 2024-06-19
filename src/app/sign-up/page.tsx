import { UserForm } from "@/app/(admin)/admin/_components/user-form";

export default function Page() {
	return (
		<UserForm
			defaultValues={{
				mode: "signUp",
				age: 18,
				email: "",
				fullName: "",
				password: "",
			}}
		/>
	);
}
