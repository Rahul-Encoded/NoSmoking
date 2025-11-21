import { Clock, RefreshCw, MessageCircle } from "lucide-react";

export default function FeatureSection() {

    return (
        <section className="py-20 md:py-24 max-w-7xl mx-auto px-6">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-16">
                How <span className="bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">QuitTrack</span> Changes the Game
            </h3>

            <div className="grid md:grid-cols-3 gap-12">

                <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl transition hover:shadow-red-500/20 hover:scale-[1.02] duration-300 group">
                    <div className="bg-linear-to-br from-red-500/10 to-red-900/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-red-500/20 group-hover:to-red-900/20 transition-colors">
                        <Clock className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="text-2xl font-semibold mb-3">The Debt Clock</h4>
                    <p className="text-muted-foreground leading-relaxed">
                        Log a smoke and watch your <span className="font-bold bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">Life Expectancy Date</span> visibly rewind by 11 minutes. This is instant, high-friction loss aversion—the most powerful psychological motivator to stop.
                    </p>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl transition hover:shadow-green-500/20 hover:scale-[1.02] duration-300 group">
                    <div className="bg-linear-to-br from-green-500/10 to-green-900/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-green-500/20 group-hover:to-green-900/20 transition-colors">
                        <RefreshCw className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-semibold mb-3">The Redemption Loop</h4>
                    <p className="text-muted-foreground leading-relaxed">
                        For every 24 hours of abstinence, you <span className="font-bold bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">earn back 30 minutes</span> of Health Bonus time. Your goal shifts from avoiding to actively <span className="font-bold bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">earning</span> a longer, healthier life.
                    </p>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl transition hover:shadow-blue-500/20 hover:scale-[1.02] duration-300 group">
                    <div className="bg-linear-to-br from-blue-500/10 to-blue-900/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-500/20 group-hover:to-blue-900/20 transition-colors">
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-2xl font-semibold mb-3">Anonymous Crisis Chain</h4>
                    <p className="text-muted-foreground leading-relaxed">
                        During a craving, tap <span className="font-bold bg-linear-to-r from-green-500 to-green-900 text-transparent bg-clip-text">"Need Support"</span> to instantly receive short, motivational messages from other users. Break the cycle without public confession or pressure.
                    </p>
                </div>
            </div>
        </section>
    )
}