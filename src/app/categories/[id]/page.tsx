import { count, eq } from "drizzle-orm";

import { Pagination } from "@/components/pagination";
import { PostCards } from "@/components/post-cards";
import { limit } from "@/constants";
import { db } from "@/db";
import { post } from "@/db/schema";

type Props = { params: { id: string }; searchParams: { page?: string } };

export default async function Page(props: Props) {
	const page = Number(props.searchParams.page) - 1 || 0;

	const offset = page * limit;

	const [categoryPostsCount, categoryPostsData] = await Promise.all([
		db
			.select({ count: count() })
			.from(post)
			.where(eq(post.categoryId, +props.params.id)),

		// db.query.category
		// 	.findMany({
		// 		limit,
		// 		offset,
		// 		where: eq(category.id, +props.params.id),
		// 		columns: {},
		// 		with: {
		// 			posts: {
		// 				columns: {
		// 					id: true,
		// 					title: true,
		// 					updatedAt: true,
		// 					shortDescription: true,
		// 				},
		// 			},
		// 		},
		// 	})
		// 	.then((res) => res[0].posts),

		db
			.select({
				id: post.id,
				title: post.title,
				shortDescription: post.shortDescription,
				updatedAt: post.updatedAt,
			})
			.from(post)
			.offset(offset)
			.limit(limit)
			.where(eq(post.categoryId, +props.params.id)),
	]);

	const pagesCount = Math.ceil(categoryPostsCount[0].count / limit);

	return (
		<>
			<PostCards data={categoryPostsData} />
			<Pagination
				page={page}
				pagesCount={pagesCount}
				urlPrefix={`/categories/${props.params.id}`}
			/>
		</>
	);
}
