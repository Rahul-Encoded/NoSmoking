"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface DashboardCalendarProps {
    smokedDates: string[];
    notSmokedDates: string[];
}

export default function DashboardCalendar({ smokedDates, notSmokedDates }: DashboardCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const smoked = smokedDates.map((d) => new Date(d));
    const notSmoked = notSmokedDates.map((d) => new Date(d));

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
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
    );
}
