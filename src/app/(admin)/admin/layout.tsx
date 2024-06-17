import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="space-y-3">
			<Button asChild variant="ghost">
				<Link href="/admin">Profile</Link>
			</Button>
			<Button asChild variant="ghost">
				<Link href="/admin/posts">Posts</Link>
			</Button>
			{children}
		</div>
	);
}
