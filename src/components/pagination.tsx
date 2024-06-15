import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = { page: number; pagesCount: number; urlPrefix: string };
export function Pagination({ page, pagesCount, urlPrefix }: Props) {
	const previousOffset = page === 0 ? 0 : page - 1;
	const nextOffset = page === pagesCount - 1 ? page : page + 1;

	return (
		<>
			<br />
			<div className="flex items-center gap-2">
				<Button variant="ghost" asChild>
					<Link href={`${urlPrefix}?page=${previousOffset + 1}`}>
						<ChevronLeft />
						Previous
					</Link>
				</Button>
				{page + 1}/{pagesCount}
				<Button variant="ghost" asChild>
					<Link href={`${urlPrefix}?page=${nextOffset + 1}`}>
						<ChevronRight />
						Next
					</Link>
				</Button>
			</div>
		</>
	);
}
