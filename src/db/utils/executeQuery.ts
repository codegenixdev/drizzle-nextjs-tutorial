import { auth } from "@/auth";

type QueryFn<T> = {
	(): Promise<T>;
};

type Options<T> = {
	queryFn: QueryFn<T>;
	serverErrorMessage?: string;
	isProtected?: boolean;
};

export async function executeQuery<T>({
	queryFn,
	serverErrorMessage = "Error executing query",
	isProtected = true,
}: Options<T>) {
	try {
		if (isProtected) {
			const session = await auth();
			if (!session) throw new Error("User is not authorized");
		}
		return await queryFn();
	} catch (error) {
		console.error(serverErrorMessage, error);
		return null;
	}
}
