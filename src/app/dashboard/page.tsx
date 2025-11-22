import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const user = await currentUser();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-xl">Welcome back, {user?.firstName || "User"}!</p>
            <p className="text-muted-foreground mt-2">Your quit journey stats will appear here.</p>
        </div>
    );
}
