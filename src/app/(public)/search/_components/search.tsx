"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/form-controllers/input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

export function Search() {
	const schema = z.object({ searchText: z.string().max(255) });

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { searchText: "" },
	});

	const router = useRouter();

	const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
		router.push(`/search?q=${data.searchText}`);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Input control={form.control} name="searchText" label="Search..." />
			</form>
		</Form>
	);
}
