import { ChartRadialText } from "@/components/rahui/radial-chart";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const user = await currentUser();

    return (
        <div className="flex min-h-screen flex-col p-20">
            <div className="flex flex-col justify-start items-center pb-20">
                <p className="text-xl">Welcome back, {user?.firstName || "User"}!</p>
                <p className="text-muted-foreground mt-2">Your quit journey stats will appear here.</p>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4">Estimated Life Date</h1>
                    <ChartRadialText footerText="This is your estimated life date if you had not smoked." />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4">Estimated Life Date</h1>
                    <ChartRadialText footerText="This is your estimated life date based on your smoking habit." />
                </div>
            </div>
        </div>
    );
}
