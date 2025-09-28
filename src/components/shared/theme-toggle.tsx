"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
	className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Render a placeholder or nothing on the server to avoid hydration mismatch
		return (
			<Button variant="ghost" size="icon" disabled className={className} />
		);
	}

	const isDark = theme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className={className}
			aria-label="Toggle theme"
		>
			<Sun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
