import { Control, FieldValues, Path } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input as RawInput } from "@/components/ui/input";

type Props<TFieldValues extends FieldValues> = {
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
	label: string;
};
export function Input<TFieldValues extends FieldValues>({
	control,
	name,
	label,
}: Props<TFieldValues>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<RawInput {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
