import Link from "next/link";

import { getCurrentUser } from "@/app/(admin)/admin/queries";
import { SignOut } from "@/app/_components/sign-out";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Button } from "@/components/ui/button";

export async function AuthUserAvatar() {
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
		<div className="flex">
			<UserAvatar
				data={{ id: currentUserData.id, fullName: currentUserData.fullName }}
				href="/admin"
			/>

			<SignOut />
		</div>
	);
}
