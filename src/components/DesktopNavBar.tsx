import { currentUser } from "@clerk/nextjs/server";
import ThemeToggle from "./ThemeToggle";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export default async function DesktopNavbar(){

	const user = await currentUser();

	return(
		<div className="hidden md:flex items-center space-x-4">
		<ThemeToggle></ThemeToggle>

		 {user ? (
			<>
				<Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
			</>
		):(
			<SignInButton mode="modal">
				<Button variant="default">Sign-In</Button>
			</SignInButton>
		)
			}
		</div>
	);
}