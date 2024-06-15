import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { PostCards } from "@/components/post-cards";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

export default async function Page() {
	const latestPostsData = await db.query.post.findMany({
		limit: 4,
		columns: { id: true, title: true, updatedAt: true, shortDescription: true },
	});

	return (
		<main>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold py-5">Latest Posts</h1>
				<Button variant="ghost" asChild>
					<Link href="/posts">
						View All
						<ChevronRightIcon />
					</Link>
				</Button>
			</div>
			<PostCards data={latestPostsData} />
		</main>
	);
}
