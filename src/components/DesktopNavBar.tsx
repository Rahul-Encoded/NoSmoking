import SignInSignOut from "./SignInSignOut";
import ThemeToggle from "./ThemeToggle";


export default function DesktopNavbar(){

	return(
		<div className="flex items-center space-x-4">
		<ThemeToggle></ThemeToggle>
		<SignInSignOut></SignInSignOut>
		</div>
	);
}