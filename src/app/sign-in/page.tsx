import { signIn } from "@/auth";

export default function SignIn() {

  put shadcn components and make login beaturfilll
	return (
		<form
			action={async (formData) => {
				"use server";
				await signIn("credentials", formData);
			}}
		>
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button>Sign In</button>
		</form>
	);
}
