"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { updateUser } from "@/app/(admin)/admin/actions";
import { signIn } from "@/app/sign-in/actions";
import { signUp } from "@/app/sign-up/actions";
import { Input } from "@/components/form-controllers/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { UserSchema, userSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
	defaultValues: UserSchema;
};
export function UserForm({ defaultValues }: Props) {
	const router = useRouter();

	const form = useForm<UserSchema>({
		resolver: zodResolver(userSchema),
		defaultValues,
	});

	const mode = useWatch({ control: form.control, name: "mode" });

	const onSubmit: SubmitHandler<UserSchema> = async (data) => {
		let response;
		if (data.mode === "update") {
			response = await updateUser(data);
		} else if (data.mode === "signUp") {
			response = await signUp(data);
		} else {
			response = await signIn(data);
		}
		if (response) {
			toast({
				title: response.message,
				variant: response.success === true ? "default" : "destructive",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				{(mode === "signUp" || mode === "update") && (
					<>
						<Input control={form.control} name="fullName" label="Full Name" />
						<Input
							control={form.control}
							name="age"
							label="Age"
							type="number"
						/>
					</>
				)}

				{(mode === "signUp" || mode === "signIn") && (
					<>
						<Input
							control={form.control}
							name="email"
							label="Email"
							type="email"
						/>
						<Input
							control={form.control}
							name="password"
							label="Password"
							type="password"
						/>
					</>
				)}

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
