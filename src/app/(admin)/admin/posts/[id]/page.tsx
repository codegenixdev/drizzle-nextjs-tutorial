import { notFound } from "next/navigation";

import { getPostById } from "@/app/(admin)/admin/posts/[id]/_queries/get-user-by-id";
import { PostForm } from "@/app/(admin)/admin/posts/_components/post-form";
import { getCategories } from "@/app/_queries/get-categories";
import { getTags } from "@/app/_queries/get-tags";
import { getCurrentUser } from "@/app/services";

type Props = { params: { id: string } };
export default async function Page({ params }: Props) {
	const categoriesData = await getCategories();
	const tagsData = await getTags();
	const currentUserData = await getCurrentUser();

	const postData = await getPostById(+params.id);

	if (!categoriesData || !tagsData || !currentUserData || !postData) notFound();

	return (
		<main className="space-y-3">
			<h1 className="text-2xl">{postData.title}</h1>

			<PostForm
				categoriesData={categoriesData}
				tagsData={tagsData}
				defaultValues={{
					...postData,
					tagIds: postData.tags.map((tag) => tag.tagId),
				}}
			/>
		</main>
	);
}
