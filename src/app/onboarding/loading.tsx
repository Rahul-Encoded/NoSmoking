import { Loader } from "@/components/ui/loader";

export default function OnboardingLoading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <Loader size="lg" text="Loading onboarding form..." />
        </div>
    );
}
