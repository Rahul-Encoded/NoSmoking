import { dbUser } from "@/actions/user.actions";
import Buttons from "@/components/Buttons";
import { ChartCarousel } from "@/components/rahui/chart-carousel";
import { redirect } from "next/navigation";
import { checkAndBackfillLogs, getSmokeCount, getSmokeHistory } from "@/actions/smoke.action";
import DashboardCalendar from "@/components/DashboardCalendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, Clock, Cigarette } from "lucide-react";

export default async function DashboardPage() {
    const user = await dbUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Check and backfill logs for previous days
    await checkAndBackfillLogs();

    const { name, initLifeExpectancy, duration, initDailyAvg, costPerCigg } = user;

    // Fetch real-time smoke count
    const loggedSmokes = await getSmokeCount();

    // Fetch smoke history for calendar
    const smokeHistory = await getSmokeHistory();

    // Calculate historical smokes (before app usage)
    // Assuming duration is in years, and 30 days/month
    const historicalSmokes = ((duration || 0) * 12 * 30) * (initDailyAvg || 0);

    const totalSmokes = historicalSmokes + loggedSmokes;
    console.log("total smokes", totalSmokes);

    const cost = totalSmokes * (costPerCigg || 0);

    // 11 minutes lost per cigarette
    const lostTimeInMinutes = totalSmokes * 11;
    const lostTimeInHours = (lostTimeInMinutes / 60).toFixed(1);
    const lostTimeInDays = (lostTimeInMinutes / (60 * 24)).toFixed(1);


    const initLifeExpectancyInMin = ((initLifeExpectancy || 0) * 365 * 24 * 60 * 60);
    // Current life expectancy = Initial - Lost Time
    const currLifeExpectancyInMin = initLifeExpectancyInMin - lostTimeInMinutes;

    const data = [initLifeExpectancyInMin, currLifeExpectancyInMin];
    const headerText = ["Initial Life Expectancy", "Current Life Expectancy"];
    const footerText = ["This is your estimated life date if you had not smoked.", "This is your estimated life date based on your smoking habit."];
    const color = ["green", "red"];


    return (
        <div className="flex min-h-screen flex-col p-8 md:p-12 space-y-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, {name?.trim() || "User"}! Here's an overview of your quit journey.
                </p>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Money Lost
                        </CardTitle>
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{cost.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Estimated cost of cigarettes
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Time Lost
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{lostTimeInMinutes.toLocaleString()} min</div>
                        <p className="text-xs text-muted-foreground">
                            ~{lostTimeInHours} hours / {lostTimeInDays} days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Cigarettes
                        </CardTitle>
                        <Cigarette className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSmokes.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime cigarettes smoked
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Life Expectancy Impact</CardTitle>
                        <CardDescription>
                            Visualizing the impact of smoking on your estimated lifespan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartCarousel data={data} headerText={headerText} footerText={footerText} color={color} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Smoking Calendar</CardTitle>
                        <CardDescription>
                            Track your daily smoking habits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <DashboardCalendar smokedDates={smokeHistory.smokedDates} notSmokedDates={smokeHistory.notSmokedDates} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center pt-6">
                <Buttons />
            </div>
        </div>
    );
}
