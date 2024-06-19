"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { createPost, editPost } from "@/app/(admin)/admin/posts/create/actions";
import { Input } from "@/components/form-controllers/input";
import SelectBox from "@/components/form-controllers/select-box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { PostSchema, postSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
	defaultValues: PostSchema;
	categoriesData: { id: number; name: string }[] | null;
	tagsData: { id: number; name: string }[] | null;
};
export function PostForm({ defaultValues, categoriesData, tagsData }: Props) {
	const router = useRouter();

	const form = useForm<PostSchema>({
		resolver: zodResolver(postSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<PostSchema> = async (data) => {
		let response;
		if (!data.id) {
			response = await createPost(data);
		} else {
			response = await editPost(data);
		}
		toast({
			title: response.message,
			variant: response.success === true ? "default" : "destructive",
		});
		router.push("/admin/posts");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<Input control={form.control} name="title" label="Title" />
				<Input
					control={form.control}
					name="shortDescription"
					label="Short description"
				/>
				<Input control={form.control} name="content" label="Content" />

				<SelectBox
					options={categoriesData}
					control={form.control}
					name="categoryId"
					label="Category"
				/>

				<SelectBox
					options={tagsData}
					control={form.control}
					name="tagIds"
					multiple
					label="Tags"
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
