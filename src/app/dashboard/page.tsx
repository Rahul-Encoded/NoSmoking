import { dbUser } from "@/actions/user.actions";
import Buttons from "@/components/Buttons";
import { ChartCarousel } from "@/components/rahui/chart-carousel";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export default async function DashboardPage() {
    const user = await dbUser();

    if (!user) {
        redirect("/sign-in");
    }

    const { name: name, initLifeExpectancy: initLifeExpectancy, duration: duration, initDailyAvg: initDailyAvg } = user;

    const initLifeExpectancyInMin = ((initLifeExpectancy || 0) * 365 * 24 * 60 * 60);
    const currLifeExpectancyInMin = (initLifeExpectancyInMin - ((duration || 0) * (initDailyAvg || 0) * 11));
    const currLifeExpectancyInYears = (currLifeExpectancyInMin / (365 * 24 * 60 * 60));
    const lostTime = (initLifeExpectancyInMin - currLifeExpectancyInMin);

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
            <h3 className="text-center text-2xl font-light mb-10">You have <span className="bg-linear-to-r from-red-500 to-red-900 text-transparent bg-clip-text">lost {lostTime} minutes</span> </h3>
            <div className="flex justify-center items-center mb-10">
                <ChartCarousel data={data} headerText={headerText} footerText={footerText} color={color} />
            </div>
            <Buttons />
        </div>
    );
}
