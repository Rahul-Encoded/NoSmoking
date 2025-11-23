"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateDailyStatus } from "@/actions/smoke.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DashboardCalendarProps {
    smokedDates: string[];
    notSmokedDates: string[];
}

export default function DashboardCalendar({ smokedDates, notSmokedDates }: DashboardCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const smoked = smokedDates.map((d) => new Date(d));
    const notSmoked = notSmokedDates.map((d) => new Date(d));

    const handleStatusUpdate = async (date: Date, status: 'smoked' | 'not-smoked') => {
        const res = await updateDailyStatus(date, status);
        if (res.success) {
            toast.success("Status updated successfully");
            setIsOpen(false);
            router.refresh();
        } else {
            toast.error("Failed to update status");
        }
    };

    const handleDayClick = (day: Date | undefined) => {
        if (!day) return;

        // Don't allow editing future dates
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (day > today) return;

        setSelectedDate(day);
        setIsOpen(true);
    };

    return (
        <div className="relative">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                onDayClick={handleDayClick}
                className="rounded-md border shadow-sm"
                modifiers={{
                    smoked: smoked,
                    notSmoked: notSmoked,
                }}
                modifiersClassNames={{
                    smoked: "bg-red-500 text-white hover:bg-red-600 hover:text-white rounded-full",
                    notSmoked: "bg-green-500 text-white hover:bg-green-600 hover:text-white rounded-full",
                }}
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Smoking Status</DialogTitle>
                        <DialogDescription>
                            {selectedDate && selectedDate.toLocaleDateString(undefined, {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            size="lg"
                            variant="default"
                            className="bg-red-500 hover:bg-red-600 text-white w-full justify-start"
                            onClick={() => selectedDate && handleStatusUpdate(selectedDate, 'smoked')}
                        >
                            🚬 I Smoked
                        </Button>
                        <Button
                            size="lg"
                            variant="default"
                            className="bg-green-500 hover:bg-green-600 text-white w-full justify-start"
                            onClick={() => selectedDate && handleStatusUpdate(selectedDate, 'not-smoked')}
                        >
                            ✅ I Didn't Smoke
                        </Button>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
