import { count, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostsTable } from "@/app/(admin)/admin/posts/_components/posts-table";
import { getCurrentUser } from "@/app/services";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { limit } from "@/constants";
import { db } from "@/db";
import { post } from "@/db/schema";

type Props = { searchParams: { page?: string } };
export default async function Page(props: Props) {
	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();

	const page = Number(props.searchParams.page) - 1 || 0;
	const offset = page * limit;

	const [postsCount, postsData] = await Promise.all([
		db
			.select({ count: count() })
			.from(post)
			.where(eq(post.userId, currentUserData.id))
			.then((res) => res[0].count),
		db.query.post.findMany({
			where: eq(post.userId, currentUserData.id),
			limit,
			offset,
			orderBy: post.id,
		}),
	]);

	const pagesCount = Math.ceil(postsCount / limit);

	return (
		<main className="space-y-3">
			<h1 className="text-2xl">Posts</h1>
			<Button className="mb-3" asChild>
				<Link href="/admin/posts/create">Create Post</Link>
			</Button>
			<PostsTable
				columns={["id", "Title", "Short Description", "Category", "Actions"]}
				rows={postsData}
			/>

			<Pagination
				page={page}
				pagesCount={pagesCount}
				urlPrefix={`/admin/posts`}
			/>
		</main>
	);
}
