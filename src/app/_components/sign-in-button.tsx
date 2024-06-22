"use client";

import { useRouter } from "next/navigation";

import { signOut } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function SignInButton() {
	const router = useRouter();
	async function handleClick() {
		await signOut();
		router.push("/sign-in");
	}

	return (
		<Button onClick={handleClick} variant="ghost">
			Sign In
		</Button>
	);
}
