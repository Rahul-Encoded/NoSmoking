import LandingPage from "@/components/LandingPage";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await currentUser();

  if (!user) return <LandingPage></LandingPage>

  const dbUser = await syncUser();

  if (!dbUser) return <LandingPage></LandingPage>

  if (!dbUser.dob || !dbUser.costPerCigg || !dbUser.initDailyAvg || !dbUser.duration || !dbUser.location || !dbUser.physicalActivity || !dbUser.jobHours || !dbUser.dietQuality || !dbUser.eatingOutFrequency || !dbUser.sleepQuality) {
    redirect("/onboarding");
  }

  redirect("/dashboard");

}
