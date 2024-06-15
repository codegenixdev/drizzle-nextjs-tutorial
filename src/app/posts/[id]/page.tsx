import { eq } from "drizzle-orm";
import parse from "html-react-parser";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCards } from "@/components/post-cards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { db } from "@/db";
import { post } from "@/db/schema";

type Props = { params: { id: string } };
export default async function Page(props: Props) {
	const postData = await db.query.post.findFirst({
		where: eq(post.id, +props.params.id),
		with: {
			category: true,
			user: { columns: { name: true } },
			comments: { with: { user: true } },
		},
	});

	if (!postData) notFound();

	const relatedPosts = await db.query.post.findMany({
		limit: 4,
		where: eq(post.categoryId, postData.categoryId),
		columns: { id: true, title: true, updatedAt: true, shortDescription: true },
	});

	return (
		<main className="flex flex-col gap-3">
			<h1 className="text-2xl font-bold">{postData.title}</h1>

			<div className="flex items-center gap-5">
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarFallback>{postData.user.name[0]}</AvatarFallback>
					</Avatar>
					<p>{postData.user.name}</p>
				</div>
				{!!postData.categoryId && (
					<Link href={`/categories/${postData.categoryId}`}>
						{postData.category?.name}
					</Link>
				)}
				<p>{new Date(postData.updatedAt).toDateString()}</p>
			</div>

			<article className="container max-w-2xl">
				{parse(postData.content)}
			</article>
			<pre>{JSON.stringify(postData.comments, null, 2)}</pre>
			{postData.comments
				.filter((comment) => !comment.parentRootId)
				.map((comment) => (
					<Card key={comment.id}>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarFallback>{comment.user.name[0]}</AvatarFallback>
								</Avatar>
								<p>{comment.user.name}</p>
							</div>
							<CardDescription>
								{new Date(comment.updatedAt).toDateString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{comment.content}</p>
						</CardContent>
						{/* TODO: nested comments */}
					</Card>
				))}

			<h1 className="text-2xl font-bold py-5">Related Posts</h1>
			<PostCards data={relatedPosts} />
		</main>
	);
}
