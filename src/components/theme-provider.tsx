"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { Toaster } from "@/components/ui/toaster";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			{children}
			<Toaster />
		</NextThemesProvider>
	);
}
