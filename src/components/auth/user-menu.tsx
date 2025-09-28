"use client";

import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth, useLogout } from "@/hooks/useAuth";

export function UserMenu() {
	const { user } = useAuth();
	const logout = useLogout();

	if (!user) {
		return null;
	}

	const initials =
		user.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase() ||
		user.email?.[0]?.toUpperCase() ||
		"U";

	const handleLogout = () => {
		logout.mutate();
	};

	return (
		<div className="flex items-center gap-2">
			<Avatar className="h-8 w-8">
				<AvatarImage src={user.image || undefined} alt={user.name || "User"} />
				<AvatarFallback className="text-sm">{initials}</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<span className="font-medium text-sm">{user.name || "User"}</span>
				<span className="text-muted-foreground text-xs">{user.email}</span>
			</div>

			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost" size="sm" className="ml-2">
						<Settings className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Account Settings</DialogTitle>
						<DialogDescription>
							Manage your account settings and preferences.
						</DialogDescription>
					</DialogHeader>

					<div className="flex items-center gap-4 py-4">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src={user.image || undefined}
								alt={user.name || "User"}
							/>
							<AvatarFallback className="text-lg">{initials}</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="font-semibold text-lg">{user.name || "User"}</h3>
							<p className="text-muted-foreground">{user.email}</p>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={handleLogout}
							disabled={logout.isPending}
							className="flex items-center gap-2"
						>
							<LogOut className="h-4 w-4" />
							{logout.isPending ? "Signing out..." : "Sign out"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
