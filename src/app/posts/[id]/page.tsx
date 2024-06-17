import { eq } from "drizzle-orm";
import parse from "html-react-parser";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { PostCards } from "@/components/post-cards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { db } from "@/db";
import { post, user } from "@/db/schema";

type Props = { params: { id: string } };
export default async function Page(props: Props) {
	const postData = await db.query.post.findFirst({
		where: eq(post.id, +props.params.id),
		with: {
			category: true,
			user: {
				columns: { id: true, fullName: true },
			},
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
			<pre></pre>
			<h1 className="text-2xl font-bold">{postData.title}</h1>

			<div className="flex items-center gap-5">
				<UserAvatar data={postData.user} />
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
				.filter((comment) => !comment.parentId)
				.map((comment) => (
					<Card key={comment.id}>
						<CardHeader>
							<UserAvatar data={comment.user} />
						</CardHeader>
						<CardContent>
							<p className="mb-3">{comment.content}</p>
							{postData.comments
								.filter((item) => comment.id === item.parentId)
								.map((item) => (
									<Fragment key={item.id}>
										<UserAvatar data={item.user} />
										<p className="ml-20 mt-0">{item.content}</p>
									</Fragment>
								))}
						</CardContent>
					</Card>
				))}

			<h1 className="text-2xl font-bold py-5">Related Posts</h1>
			<PostCards data={relatedPosts} />
		</main>
	);
}
