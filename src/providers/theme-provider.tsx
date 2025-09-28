"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
	enableSystem?: boolean;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "dark",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "loyal-rev-theme",
	enableSystem = false,
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(storageKey) as Theme;
			if (stored) return stored;
			return defaultTheme;
		}
		return defaultTheme;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		// Prevent FOUC: set class before paint
		root.classList.remove("light", "dark");
		if (theme === "system" && enableSystem) {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
		} else {
			root.classList.add(theme);
		}
	}, [theme, enableSystem]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
