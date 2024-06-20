"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { signOut } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function SignOut() {
	const router = useRouter();

	async function handleSignOutClick() {
		await signOut();
		router.push("/sign-in");
	}

	return (
		<Button size="icon" variant="ghost" onClick={handleSignOutClick}>
			<LogOut className="h-4 w-4 text-destructive" />
		</Button>
	);
}
