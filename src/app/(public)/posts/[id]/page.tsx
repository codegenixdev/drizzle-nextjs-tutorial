import { eq } from "drizzle-orm";
import parse from "html-react-parser";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentReply } from "@/app/(public)/posts/[id]/_components/comment-reply";
import { auth } from "@/auth";
import { PostCards } from "@/components/post-cards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { db } from "@/db";
import { post, user } from "@/db/schema";

type Props = { params: { id: string } };
export default async function Page(props: Props) {
	const session = await auth();

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
			{!!session?.user?.id && (
				<CommentReply
					defaultValues={{
						postId: postData.id,
						userId: session.user.id,
						content: "",
						parentId: null,
					}}
				/>
			)}
			{postData.comments
				.filter((comment) => !comment.parentId)
				.map((comment) => (
					<Card key={comment.id}>
						<CardHeader>
							<UserAvatar data={comment.user} />
						</CardHeader>
						<CardContent className="space-y-3">
							<p className="mb-3">{comment.content}</p>
							{!!currentUserData && (
								<CommentReply
									defaultValues={{
										postId: postData.id,
										userId: currentUserData.id,
										content: "",
										parentId: comment.id,
									}}
								/>
							)}
							<div className="space-y-3">
								{postData.comments
									.filter((item) => comment.id === item.parentId)
									.map((item) => (
										<div key={item.id}>
											<UserAvatar data={item.user} />
											<p className="ml-20 mt-0">{item.content}</p>
										</div>
									))}
							</div>
						</CardContent>
					</Card>
				))}
			<h1 className="text-2xl font-bold py-5">Related Posts</h1>
			<PostCards data={relatedPosts} />
		</main>
	);
}
