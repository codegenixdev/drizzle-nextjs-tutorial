import { LogOut } from "lucide-react";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

export default async function AuthUserAvatar() {
	const session = await auth();

	if (!session?.user)
		return (
			<div className="flex items-center">
				<Button asChild variant="ghost">
					<Link href="/sign-in">Sign In</Link>
				</Button>
				<Button asChild variant="ghost">
					<Link href="/sign-up">Sign Up</Link>
				</Button>
			</div>
		);

	return (
		<>
			<UserAvatar
				data={{ id: session.user.id, fullName: session.user.fullName }}
				href="/admin"
			/>

			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<Button type="submit" size="icon" variant="ghost">
					<LogOut className="h-4 w-4 text-red-500" />
				</Button>
			</form>
		</>
	);
}
