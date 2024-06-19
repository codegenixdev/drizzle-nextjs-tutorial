import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SelectUserModel } from "@/db/schema/user";

type Props = {
	data?: Pick<SelectUserModel, "id" | "fullName">;
	href?: string;
};
export function UserAvatar(props: Props) {
	const { data } = props;
	const { href = `/posts/user/${data?.id}` } = props;

	return (
		<Link href={href}>
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarFallback>{data?.fullName[0]}</AvatarFallback>
				</Avatar>
				<p>{data?.fullName}</p>
			</div>
		</Link>
	);
}
