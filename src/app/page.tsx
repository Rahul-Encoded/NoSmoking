import DashBoard from "@/components/DashBoard";
import Form from "@/components/Form";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  const user = await currentUser();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">

      {user ? (<Form></Form>) : (<DashBoard></DashBoard>)}

    </div>
  );
}
