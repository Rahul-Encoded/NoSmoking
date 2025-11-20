import { SignIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import DesktopNavbar from "./DesktopNavBar";

export default async function Navbar(){

	return(
		<nav className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='text-xl bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text font-mono tracking-wider'>
              QuitTrack
            </Link>
          </div>

          <DesktopNavbar></DesktopNavbar>
          
        </div>
      </div>

    </nav>
	)
}