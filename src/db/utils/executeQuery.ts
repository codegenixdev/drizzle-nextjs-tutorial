import { auth } from "@/auth";

type QueryFunction<T> = {
	(...args: any[]): Promise<T>;
};

type ExecuteQueryOptions<T> = {
	queryFn: QueryFunction<T>;
	errorMessage?: string;
	args?: any[];
	isProtected?: boolean;
};

export async function executeQuery<T>({
	queryFn,
	errorMessage = "Error executing query",
	args = [],
	isProtected = true,
}: ExecuteQueryOptions<T>): Promise<T | null> {
	try {
		if (isProtected) {
			const session = await auth();
			if (!session) throw new Error("You are not authorized");
		}
		return await queryFn(...args);
	} catch (error) {
		console.error(errorMessage, error);
		return null;
	}
}
