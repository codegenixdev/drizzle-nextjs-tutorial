import { notFound } from "next/navigation";

import { PostCards } from "@/app/(public)/_components/post-cards";
import {
	getCategoryPostsCount,
	getPostsByCategoryId,
} from "@/app/(public)/categories/[id]/queries";
import { getCategories } from "@/app/queries";
import { Pagination } from "@/components/pagination";

type Props = { params: { id: string }; searchParams: { page?: string } };

export default async function Page(props: Props) {
	const categoryId = +props.params.id;

	const limit = 8;
	const page = Number(props.searchParams.page) - 1 || 0;

	const [categoryPostsCount, categoryPostsData, categoriesData] =
		await Promise.all([
			getCategoryPostsCount(categoryId),
			getPostsByCategoryId(page, limit, categoryId),
			getCategories(),
		]);

	if (!categoriesData) notFound();

	const pagesCount = Math.ceil(categoryPostsCount || 0 / limit);

	return (
		<main>
			<h1 className="text-2xl font-bold py-5">
				{categoriesData.find((category) => category.id === categoryId)?.name}{" "}
				Posts
			</h1>
			<PostCards data={categoryPostsData} />
			<Pagination
				page={page}
				pagesCount={pagesCount}
				urlPrefix={`/categories/${props.params.id}`}
			/>
		</main>
	);
}
