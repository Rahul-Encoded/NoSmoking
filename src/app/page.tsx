import DashBoard from "@/components/DashBoard";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  const user = await currentUser();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">

      {user ? (<></>) : (<DashBoard></DashBoard>)}

    </div>
  );
}
