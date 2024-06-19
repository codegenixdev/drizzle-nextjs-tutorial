"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { createComment } from "@/app/(public)/posts/[id]/_actions/create-comment";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CommentSchema, commentSchema } from "@/db/schema/comment";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = { defaultValues: CommentSchema };
export function CommentReply({ defaultValues }: Props) {
	const form = useForm<CommentSchema>({
		resolver: zodResolver(commentSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<CommentSchema> = async (data) => {
		console.log(data);
		const response = await createComment(data);
		toast({
			title: response.message,
			variant: response.success === true ? "default" : "destructive",
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea className="resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="secondary">
					{!!defaultValues.parentId ? "Send Reply" : "Send Comment"}
				</Button>
			</form>
		</Form>
	);
}
