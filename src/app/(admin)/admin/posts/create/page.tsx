import { notFound } from "next/navigation";

import { PostForm } from "@/app/(admin)/admin/posts/_components/post-form";
import { getCurrentUser } from "@/app/(admin)/admin/queries";
import { getCategories, getTags } from "@/app/queries";

export default async function Page() {
	const categoriesData = await getCategories();
	const tagsData = await getTags();
	const currentUserData = await getCurrentUser();

	if (!currentUserData) notFound();
	if (!categoriesData || categoriesData.length === 0)
		return <>Not categories found</>;

	return (
		<main className="space-y-3">
			<h1 className="text-2xl">Create Post</h1>

			{!!categoriesData && (
				<PostForm
					categoriesData={categoriesData}
					tagsData={tagsData}
					defaultValues={{
						title: "",
						shortDescription: "",
						userId: currentUserData?.id,
						categoryId: categoriesData[0].id,
						content: "",
						tagIds: [],
					}}
				/>
			)}
		</main>
	);
}
