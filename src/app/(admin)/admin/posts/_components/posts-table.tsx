import { eq } from "drizzle-orm";
import { EllipsisVertical, Eye, Pencil } from "lucide-react";
import Link from "next/link";

import { DeletePostButton } from "@/app/(admin)/admin/posts/_components/delete-post-button";
import { getCategories } from "@/app/_queries/get-categories";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { post, SelectPostModel } from "@/db/schema";

type Props = {
	rows: SelectPostModel[];
	columns: string[];
};
export async function PostsTable({ rows, columns }: Props) {
	const categoriesData = await getCategories();

	async function deletePostById(id: number) {
		"use server";
		await db.delete(post).where(eq(post.id, id));
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((column) => (
						<TableHead key={column}>{column}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.id}>
						<TableCell className="font-medium">{row.id}</TableCell>
						<TableCell className="font-medium">{row.title}</TableCell>
						<TableCell className="font-medium">
							{row.shortDescription}
						</TableCell>
						<TableCell className="font-medium">
							{
								categoriesData.find(
									(category) => category.id === row.categoryId
								)?.name
							}
						</TableCell>
						<TableCell>
							<Popover>
								<PopoverTrigger>
									<EllipsisVertical />
								</PopoverTrigger>
								<PopoverContent className="flex flex-col items-start w-fit">
									<Button variant="ghost" asChild>
										<Link href={`/admin/posts/${row.id}`}>
											<Pencil className="mr-2 h-4 w-4" />
											Edit
										</Link>
									</Button>
									<Button variant="ghost" asChild>
										<Link href={`/posts/${row.id}`}>
											<Eye className="mr-2 h-4 w-4" />
											View
										</Link>
									</Button>
									<DeletePostButton id={row.id} />
								</PopoverContent>
							</Popover>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
