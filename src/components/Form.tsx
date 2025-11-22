"use client";
import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { updateUserData } from "@/actions/user.actions";
import { toast } from "sonner";

export default function Form() {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [cost, setCost] = useState("");
    const [dailyAvg, setDailyAvg] = useState("");
    const [duration, setDuration] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    const handleSubmit = async () => {
        if (!date || !cost || !dailyAvg || !duration) return;

        setIsPosting(true);
        console.log("Date", date);

        const costNum = Number(cost);
        const dailyAvgNum = Number(dailyAvg);
        const durationNum = Number(duration);

        try {
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            console.log("UTC Date", utcDate);

            const result = await updateUserData(utcDate, costNum, dailyAvgNum, durationNum);

            if (result?.success) {
                setIsPosting(false);
                toast.success("User data updated successfully");
            }
        } catch (error) {
            setIsPosting(false);
            toast.error("Failed to update user data");
        } finally {
            setIsPosting(false);
        }
    };


    return (
        <div className="w-full max-w-md">
            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>
                            About you
                        </FieldLegend>
                        <FieldDescription>
                            Tell us about your habit.
                        </FieldDescription>
                        <Field>
                            <FieldLabel htmlFor="date">Date of birth</FieldLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <ChevronDownIcon></ChevronDownIcon>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar mode="single" selected={date} captionLayout="dropdown" onSelect={(date) => { setDate(date); setOpen(false); }}></Calendar>
                                </PopoverContent>
                            </Popover>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="cost">Average Cost per Ciggarette</FieldLabel>
                            <Input id="cost" required onChange={(e) => setCost(e.target.value)} disabled={isPosting}></Input>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="dailyavg">Daily Average</FieldLabel>
                            <Input id="dailyavg" required onChange={(e) => setDailyAvg(e.target.value)} disabled={isPosting}></Input>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="duration">You have been smoking since</FieldLabel>
                            <Input id="duration" required onChange={(e) => setDuration(e.target.value)} disabled={isPosting}></Input>
                        </Field>
                    </FieldSet>
                    <Field orientation="horizontal">
                        <Button type="submit" onClick={handleSubmit} disabled={isPosting}>Submit</Button>
                        <Button variant="outline" type="button">Cancel</Button>
                    </Field>
                </FieldGroup>
            </form>

        </div>
    )
}