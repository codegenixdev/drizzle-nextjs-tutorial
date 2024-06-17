import { notFound } from "next/navigation";

import { PostForm } from "@/app/(admin)/admin/posts/_components/post-form";
import { getCategories } from "@/app/_queries/get-categories";
import { getTags } from "@/app/_queries/get-tags";
import { getCurrentUser } from "@/app/services";

export default async function Page() {
	const categoriesData = await getCategories();
	const tagsData = await getTags();
	const currentUserData = await getCurrentUser();

	if (!categoriesData || !tagsData || !currentUserData) notFound();

	return (
		<main className="space-y-3">
			<h1 className="text-2xl">Create Post</h1>

			<PostForm
				categoriesData={categoriesData}
				tagsData={tagsData}
				defaultValues={{
					categoryId: categoriesData[0].id,
					content: "",
					tagIds: [],
					title: "",
					userId: currentUserData?.id,
					shortDescription: "",
				}}
			/>
		</main>
	);
}
