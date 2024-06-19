import { PostCards } from "@/app/(public)/_components/post-cards";
import {
	getCategoryPostsCount,
	getPostsByCategoryId,
} from "@/app/(public)/categories/[id]/queries";
import { Pagination } from "@/components/pagination";

type Props = { params: { id: string }; searchParams: { page?: string } };

export default async function Page(props: Props) {
	const limit = 8;
	const page = Number(props.searchParams.page) - 1 || 0;

	const [categoryPostsCount, categoryPostsData] = await Promise.all([
		getCategoryPostsCount(+props.params.id),
		getPostsByCategoryId(page, limit, +props.params.id),
	]);

	const pagesCount = Math.ceil(categoryPostsCount || 0 / limit);

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
