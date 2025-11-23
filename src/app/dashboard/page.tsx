import { dbUser, updateUserData } from "@/actions/user.actions";
import Buttons from "@/components/Buttons";
import { ChartCarousel } from "@/components/rahui/chart-carousel";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { checkAndBackfillLogs, getSmokeCount, getSmokeHistory } from "@/actions/smoke.action";
import DashboardCalendar from "@/components/DashboardCalendar";


export default async function DashboardPage() {
    const user = await dbUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Check and backfill logs for previous days
    await checkAndBackfillLogs();

    const { name: name, initLifeExpectancy: initLifeExpectancy, duration: duration, initDailyAvg: initDailyAvg, costPerCigg: costPerCigg } = user;

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

    const initLifeExpectancyInMin = ((initLifeExpectancy || 0) * 365 * 24 * 60 * 60);
    // Current life expectancy = Initial - Lost Time
    const currLifeExpectancyInMin = initLifeExpectancyInMin - lostTimeInMinutes;

    const data = [initLifeExpectancyInMin, currLifeExpectancyInMin];
    const headerText = ["Initial Life Expectancy", "Current Life Expectancy"];
    const footerText = ["This is your estimated life date if you had not smoked.", "This is your estimated life date based on your smoking habit."];
    const color = ["green", "red"];


    return (
        <div className="flex min-h-screen flex-col p-20">
            <div className="flex flex-col justify-start items-center pb-20">
                <p className="text-xl">Welcome back, {name?.trim() || "User"}!</p>
                <p className="text-muted-foreground mt-2">Your quit journey stats will appear here.</p>
            </div>
            <h3 className="text-center text-2xl font-light mb-10">You have <span className="bg-linear-to-r from-red-500 to-red-900 text-transparent bg-clip-text">lost {lostTimeInMinutes} minutes & {cost} rupees</span> </h3>
            <div className="flex justify-center items-center mb-10 gap-10 flex-wrap">
                <ChartCarousel data={data} headerText={headerText} footerText={footerText} color={color} />
                <DashboardCalendar smokedDates={smokeHistory.smokedDates} notSmokedDates={smokeHistory.notSmokedDates} />
            </div>
            <Buttons />
        </div>
    );
}
