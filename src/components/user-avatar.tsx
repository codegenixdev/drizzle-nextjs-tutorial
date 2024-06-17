import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SelectUserModel } from "@/db/schema/user";

type Props = {
	data: Pick<SelectUserModel, "id" | "fullName">;
};
export function UserAvatar({ data }: Props) {
	return (
		<div className="flex items-center gap-2">
			<Avatar>
				<AvatarFallback>{data.fullName[0]}</AvatarFallback>
			</Avatar>
			<p>{data.fullName}</p>
		</div>
	);
}
