import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, ClipboardList, BarChart3, Calendar } from "lucide-react";

export default function AppFlowSection() {
    const steps = [
        {
            icon: UserPlus,
            title: "Sign Up",
            description: "Create your account securely with Clerk authentication",
            color: "text-blue-500",
        },
        {
            icon: ClipboardList,
            title: "Complete Onboarding",
            description: "Tell us about your smoking habits and lifestyle",
            color: "text-purple-500",
        },
        {
            icon: BarChart3,
            title: "View Your Dashboard",
            description: "See your progress with metrics, charts, and life expectancy impact",
            color: "text-green-500",
        },
        {
            icon: Calendar,
            title: "Track Daily",
            description: "Log your daily smoking status and watch your progress grow",
            color: "text-orange-500",
        },
    ];

    return (
        <section className="py-16 px-4 md:px-8 bg-linear-to-b from-background to-muted/20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Your Journey to a Smoke-Free Life
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Follow these simple steps to start tracking your progress and reclaim your health
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative">
                                <Card className="h-full transition-all hover:shadow-lg hover:scale-105 border-2">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`p-3 rounded-lg bg-muted ${step.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <span className="text-sm font-semibold text-muted-foreground">
                                                Step {index + 1}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {step.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>

                                {/* Arrow connector for desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                        <svg
                                            className="w-6 h-6 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Ready to begin? Sign up now and take the first step towards a healthier you!
                    </p>
                </div>
            </div>
        </section>
    );
}
