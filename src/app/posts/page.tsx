import { count } from "drizzle-orm";

import { Pagination } from "@/components/pagination";
import { PostCards } from "@/components/post-cards";
import { limit } from "@/constants";
import { db } from "@/db";
import { post } from "@/db/schema";

type Props = { searchParams: { page?: string } };
export default async function Page(props: Props) {
	const page = Number(props.searchParams.page) - 1 || 0;
	const offset = page * limit;

	const [postsCount, postsData] = await Promise.all([
		db
			.select({ count: count() })
			.from(post)
			.then((res) => res[0].count),
		db.query.post.findMany({
			limit,
			offset,
			orderBy: post.id,
		}),
	]);

	const pagesCount = Math.ceil(postsCount / limit);

	return (
		<main>
			<PostCards data={postsData} />
			<Pagination page={page} pagesCount={pagesCount} urlPrefix="/posts" />
		</main>
	);
}
