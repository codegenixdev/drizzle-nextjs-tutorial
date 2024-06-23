"use server";

export async function deletePostById(id: number) {
	return {
		status: true,
		message: "Post deleted successfully",
	};
}
