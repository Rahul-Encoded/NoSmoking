import { Wallet } from "lucide-react";
import Link from "next/link";

export default function FnHSaving() {

    return (
        <section className="py-20 md:py-32 text-center max-w-5xl mx-auto px-6">
            <div className="flex justify-center mb-8">
                <div className="bg-linear-to-br from-green-500/10 to-green-900/10 p-4 rounded-2xl">
                    <Wallet className="w-12 h-12 text-green-600" />
                </div>
            </div>

            <h3 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                You're Not Just Saving Time. <br />
                You're <span className="bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">Saving Money</span>.
            </h3>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Every minute earned is a penny saved. <span className="bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">QuitTrack</span> tracks your accumulating financial wins alongside your physical health recovery milestones.
            </p>

            <Link href="#" className="inline-block px-12 py-4 text-lg font-bold text-secondary bg-linear-to-r from-green-500 to-green-900 rounded-xl shadow-2xl shadow-green-600/40 hover:bg-green-400 transition transform hover:scale-105 duration-500">
                Ready to change your date?
            </Link>
        </section>
    )
}