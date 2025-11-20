import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.actions";


export default async function SignInSignOut(){
		const user = await currentUser();
		console.log("TYPE", typeof(user), user)
		console.log("EMAIL", user?.emailAddresses[0].emailAddress.split("@")[0])

		if (user) await syncUser();


	return(
		<>
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
					<SignOutButton>
						<Button variant="default">Sign-out</Button>
					</SignOutButton>
					<UserButton></UserButton>
			</>
		):(
			<SignInButton mode="modal">
				<Button variant="default">Sign-In</Button>
			</SignInButton>
		)
			}
		</>
	);
}