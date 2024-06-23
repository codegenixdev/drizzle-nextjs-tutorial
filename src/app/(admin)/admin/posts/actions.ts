"use server";

export async function deletePostById(id: number) {
	return {
		success: true,
		message: "Post deleted successfully",
	};
}
