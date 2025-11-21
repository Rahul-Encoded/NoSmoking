import Link from "next/link";

export default function HeroSection(){

	return(
		<header className="py-20 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
            <p className="text-xl font-mono bg-linear-to-r from-red-500 to-red-900 text-transparent bg-clip-text mb-4 tracking-widest uppercase">The True Cost is Always Time</p>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                Stop Quitting Tomorrow. <br></br> Start <span className="bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">Earning</span> Today.
            </h2>
						<br></br>
						<br></br>
						
						
            <p className="text-xl text-primary/60 mb-10 max-w-2xl mx-auto">
                QuitTrack quantifies the invisible cost of smoking by <span className="bg-linear-to-r from-red-500 to-red-900 text-transparent bg-clip-text">subtracting 11 minutes</span> of your estimated life for every cigarette. We turn abstract health data into an undeniable, daily motivation.
            </p>
            <Link href="#" className="inline-block px-12 py-4 text-lg font-bold text-secondary bg-linear-to-r from-green-500 to-green-900 rounded-xl shadow-2xl shadow-green-600/40 hover:bg-green-400 transition transform hover:scale-105 duration-500">
                Start Your Clock Now
            </Link>
        </div>
    </header>
	);
}