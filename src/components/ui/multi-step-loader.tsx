import { Loader } from "./loader";

interface MultiStepLoaderProps {
    isLoading: boolean;
}

export function MultiStepLoader({ isLoading }: MultiStepLoaderProps) {
    const steps = [
        "Determining your life expectancy",
        "Building your personalized dashboard",
        "Analyzing your smoking patterns",
    ];

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card p-8 rounded-lg shadow-lg border max-w-md w-full">
                <div className="flex flex-col items-center gap-6">
                    <Loader size="lg" />
                    <div className="w-full space-y-3">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="animate-pulse text-center text-sm text-muted-foreground"
                                style={{
                                    animationDelay: `${index * 0.5}s`,
                                    animationDuration: "2s",
                                }}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        This may take a few moments...
                    </p>
                </div>
            </div>
        </div>
    );
}
