"use client";
import { dbUser, smoked } from "@/actions/user.actions";
import { logSmoke } from "@/actions/smoke.action";
import { Button } from "./ui/button";
import prisma from "@/lib/prisma";
import { toast } from "sonner";

export default function Buttons() {

    const handleSmoked = async () => {
        try {
            const smokedData = await smoked();
            await logSmoke();

            if (smokedData?.success) {
                toast.success("You smoked!👎🏻");
            }
        } catch (error) {
            console.error("Error in handleSmoked", error);
            toast.error("Failed to update smoked data");
        }
    }

    return (
        <div className="flex justify-center items-center">
            <Button variant="outline" className="mx-10 bg-linear-to-r from-red-500 to-red-900 hover:scale-110" onClick={handleSmoked}>L👎🏻 I smoked</Button>
            <Button variant="default" className="mx-10 bg-linear-to-r from-green-500 to-green-900 hover:scale-110" onClick={() => { }}>W🤙🏻 I didn't</Button>
        </div>
    )
}