import { Loader } from "@/components/ui/loader";

export default function DashboardLoading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <Loader size="lg" text="Loading your dashboard..." />
        </div>
    );
}
