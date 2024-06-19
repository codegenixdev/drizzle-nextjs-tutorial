import { LogOut } from "lucide-react";
import Link from "next/link";

import { getCurrentUser } from "@/app/(admin)/admin/queries";
import { UserAvatar } from "@/app/_components/user-avatar";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function AuthUserAvatar() {
	const currentUserData = await getCurrentUser();
	if (!currentUserData)
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
				data={{ id: currentUserData.id, fullName: currentUserData.fullName }}
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
