import LandingPage from "@/components/LandingPage";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/actions/user.actions";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await currentUser();

  if (!user) return <LandingPage></LandingPage>

  const dbUser = await getUserByClerkId(user.id);

  if (!dbUser) return <LandingPage></LandingPage>

  if (!dbUser.dob || !dbUser.costPerCigg || !dbUser.initDailyAvg) {
    redirect("/onboarding");
  }

  redirect("/dashboard");

}
