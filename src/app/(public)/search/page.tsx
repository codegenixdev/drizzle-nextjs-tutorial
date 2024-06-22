import { PostCards } from "@/app/(public)/_components/post-cards";
import { getPosts, getPostsCount } from "@/app/queries";
import { Pagination } from "@/components/pagination";

type Props = { searchParams: { q?: string; page?: string } };
export default async function Page(props: Props) {
	const limit = 8;
	const searchTerm = props.searchParams.q || "";
	const page = Number(props.searchParams.page) - 1 || 0;

	const [postsCount, postsData] = await Promise.all([
		getPostsCount(searchTerm),
		getPosts(page, limit, searchTerm),
	]);

	const pagesCount = Math.ceil((postsCount || 0) / limit);

	return (
		<main>
			<h1 className="text-2xl font-bold py-5">
				{`Search for "${searchTerm}"`}
			</h1>
			<PostCards data={postsData} />
			<Pagination
				page={page}
				pagesCount={pagesCount}
				urlPrefix={`/search?q=${searchTerm}&`}
			/>
		</main>
	);
}
