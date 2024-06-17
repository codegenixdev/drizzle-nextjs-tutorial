"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { updateUser } from "@/app/(admin)/admin/_actions/update-user";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { UserSchema, userSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
	defaultValues: UserSchema;
};
export function UserForm({ defaultValues }: Props) {
	const form = useForm<UserSchema>({
		resolver: zodResolver(userSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<UserSchema> = async (data) => {
		const response = await updateUser(data);
		toast({
			title: response.message,
			variant: response.success === true ? "default" : "destructive",
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Age</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
