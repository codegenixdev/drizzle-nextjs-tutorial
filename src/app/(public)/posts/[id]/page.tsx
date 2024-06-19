import parse from "html-react-parser";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCards } from "@/app/(public)/_components/post-cards";
import { CommentReplyForm } from "@/app/(public)/posts/[id]/_components/comment-reply-form";
import { getPostById } from "@/app/(public)/posts/[id]/queries";
import { UserAvatar } from "@/app/_components/user-avatar";
import { getRelatedPostsByCategoryId } from "@/app/queries";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = { params: { id: string } };
export default async function Page(props: Props) {
	const session = await auth();

	const postData = await getPostById(+props.params.id);
	if (!postData) notFound();

	const relatedPostsData = await getRelatedPostsByCategoryId(
		postData.categoryId
	);

	return (
		<main className="flex flex-col gap-3 ">
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
			<article className="container max-w-2xl break-words">
				{parse(postData.content)}
			</article>
			{!!session?.user?.id && (
				<CommentReplyForm
					defaultValues={{
						postId: postData.id,
						userId: +session.user.id,
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
							{!!session?.user?.id && (
								<CommentReplyForm
									defaultValues={{
										postId: postData.id,
										userId: +session.user.id,
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
			<PostCards data={relatedPostsData} />
		</main>
	);
}
