import { Search } from "@/app/(public)/search/_components/search";

type Props = { searchParams: { q: string } };
export default async function Page(props: Props) {
	return (
		<div>
			<Search />
			{/* <PostCards data={} /> */}
		</div>
	);
}
