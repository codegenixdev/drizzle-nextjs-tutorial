import Link from "next/link";
import { notFound } from "next/navigation";

import { PostsTable } from "@/app/(admin)/admin/posts/_components/posts-table";
import { getCurrentUser } from "@/app/(admin)/admin/queries";
import { getUserPosts, getUserPostsCount } from "@/app/queries";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";

type Props = { searchParams: { page?: string } };
export default async function Page(props: Props) {
	const limit = 8;

	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();

	const page = Number(props.searchParams.page) - 1 || 0;

	const [userPostsCount, userPostsData] = await Promise.all([
		getUserPostsCount(currentUserData.id),
		getUserPosts({ limit, page, userId: currentUserData.id }),
	]);

	const pagesCount = Math.ceil((userPostsCount || 0) / limit);

	return (
		<main className="space-y-3">
			<h1 className="text-2xl">Posts</h1>
			<Button className="mb-3" asChild>
				<Link href="/admin/posts/create">Create Post</Link>
			</Button>
			<PostsTable
				columns={["id", "Title", "Short Description", "Category", "Actions"]}
				rows={userPostsData}
			/>

			<Pagination
				page={page}
				pagesCount={pagesCount}
				urlPrefix={`/admin/posts?`}
			/>
		</main>
	);
}
