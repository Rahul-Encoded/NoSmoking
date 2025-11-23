"use client";
import { dbUser, smoked } from "@/actions/user.actions";
import { logNoSmoke, logSmoke, getDailyLogStatus } from "@/actions/smoke.action";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Buttons() {
    const [hasSmoked, setHasSmoked] = useState(false);
    const [hasLoggedNoSmoke, setHasLoggedNoSmoke] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchStatus = async () => {
        try {
            const status = await getDailyLogStatus();
            setHasSmoked(status.hasSmoked);
            setHasLoggedNoSmoke(status.hasLoggedNoSmoke);
        } catch (error) {
            console.error("Error fetching status", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleSmoked = async () => {
        try {
            const smokedData = await smoked();
            const smokeLog = await logSmoke();

            if (smokedData?.success && smokeLog?.success) {
                toast.success("You smoked!👎🏻");
                // Update state: User smoked, so remove no-smoke log if it existed (backend handles it, UI should reflect)
                setHasSmoked(true);
                setHasLoggedNoSmoke(false);
                router.refresh();
            }
        } catch (error) {
            console.error("Error in handleSmoked", error);
            toast.error("Failed to update smoked data");
        }
    }

    const handleNoSmoked = async () => {
        try {
            const nonSmokeLog = await logNoSmoke();

            if (nonSmokeLog?.success) {
                toast.success("You didn't smoke today!🤙🏻");
                setHasLoggedNoSmoke(true);
                router.refresh();
            } else if (nonSmokeLog?.error === "Already smoked today") {
                toast.error("You already smoked today!");
            }
        } catch (error) {
            console.error("Error in handleNoSmoked", error);
            toast.error("Failed to update no smoking data");
        }
    }


    return (
        <div className="flex justify-center items-center">
            <Button
                variant="outline"
                className="mx-10 bg-linear-to-r from-red-500 to-red-900 hover:scale-110"
                onClick={handleSmoked}
            >
                L👎🏻 I smoked
            </Button>
            <Button
                variant="default"
                className="mx-10 bg-linear-to-r from-green-500 to-green-900 hover:scale-110"
                onClick={handleNoSmoked}
                disabled={hasSmoked || hasLoggedNoSmoke || loading}
            >
                W🤙🏻 I didn't
            </Button>
        </div>
    )
}