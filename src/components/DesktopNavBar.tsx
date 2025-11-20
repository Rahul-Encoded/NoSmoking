import SignIn from "./SignIn";
import ThemeToggle from "./ThemeToggle";


export default function DesktopNavbar(){

	return(
		<div className="flex items-center space-x-4">
		<ThemeToggle></ThemeToggle>
		<SignIn></SignIn>
		</div>
	);
}