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
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Form() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [cost, setCost] = useState("");
    const [dailyAvg, setDailyAvg] = useState("");
    const [duration, setDuration] = useState("");
    const [location, setLocation] = useState("");
    const [physicalActivity, setPhysicalActivity] = useState("");
    const [jobHours, setJobHours] = useState("");
    const [dietQuality, setDietQuality] = useState("");
    const [eatingOutFrequency, setEatingOutFrequency] = useState("");
    const [sleepQuality, setSleepQuality] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!date || !cost || !dailyAvg || !duration) return;

        setIsPosting(true);
        console.log("Date", date);

        const costNum = Number(cost);
        const dailyAvgNum = Number(dailyAvg);
        const durationNum = Number(duration);
        const jobHoursNum = Number(jobHours);

        try {
            const utcDate = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            console.log("UTC Date", utcDate);

            const result = await updateUserData(
                utcDate,
                costNum,
                dailyAvgNum,
                durationNum,
                location,
                physicalActivity,
                jobHoursNum,
                dietQuality,
                eatingOutFrequency,
                sleepQuality
            );

            if (result?.success) {
                setIsPosting(false);
                toast.success("User data updated successfully");
                router.push("/dashboard");
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
                        <FieldLegend>About you</FieldLegend>
                        <FieldDescription>Tell us about your habit.</FieldDescription>

                        <Field>
                            <FieldLabel htmlFor="date">Date of birth</FieldLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-48 justify-between font-normal"
                                        disabled={isPosting}
                                    >
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="center"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date);
                                            setOpen(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="cost">Average Cost per Cigarette</FieldLabel>
                            <Input
                                id="cost"
                                required
                                onChange={(e) => setCost(e.target.value)}
                                disabled={isPosting}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="dailyavg">Daily Average</FieldLabel>
                            <Input
                                id="dailyavg"
                                required
                                onChange={(e) => setDailyAvg(e.target.value)}
                                disabled={isPosting}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="duration">You have been smoking since</FieldLabel>
                            <Input
                                id="duration"
                                required
                                onChange={(e) => setDuration(e.target.value)}
                                disabled={isPosting}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="location">Location</FieldLabel>
                            <Input
                                id="location"
                                required
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={isPosting}
                            />
                        </Field>

                        {/* Physical Activity Dropdown */}
                        <Field>
                            <FieldLabel htmlFor="physicalActivity">Physical Activity</FieldLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-56 justify-between font-normal"
                                        disabled={isPosting}
                                    >
                                        {physicalActivity || "Select activity level"}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Physical Activity</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={physicalActivity}
                                        onValueChange={setPhysicalActivity}
                                    >
                                        <DropdownMenuRadioItem value="Sedentary">
                                            Sedentary
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Lightly Active">
                                            Lightly Active
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Moderately Active">
                                            Moderately Active
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Very Active">
                                            Very Active
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="jobHours">Job Hours</FieldLabel>
                            <Input
                                id="jobHours"
                                required
                                onChange={(e) => setJobHours(e.target.value)}
                                disabled={isPosting}
                            />
                        </Field>

                        {/* Diet Quality Dropdown */}
                        <Field>
                            <FieldLabel htmlFor="dietQuality">Diet Quality</FieldLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-56 justify-between font-normal"
                                        disabled={isPosting}
                                    >
                                        {dietQuality || "Select diet quality"}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Diet Quality</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={dietQuality}
                                        onValueChange={setDietQuality}
                                    >
                                        <DropdownMenuRadioItem value="Very Healthy">
                                            Very Healthy
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Healthy">
                                            Healthy
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Average">
                                            Average
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Unhealthy">
                                            Unhealthy
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Field>

                        {/* Eating Out Frequency Dropdown */}
                        <Field>
                            <FieldLabel htmlFor="eatingOutFrequency">
                                Eating Out Frequency
                            </FieldLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-56 justify-between font-normal"
                                        disabled={isPosting}
                                    >
                                        {eatingOutFrequency || "Select frequency"}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64">
                                    <DropdownMenuLabel>Eating Out Frequency</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={eatingOutFrequency}
                                        onValueChange={setEatingOutFrequency}
                                    >
                                        <DropdownMenuRadioItem value="Rarely">
                                            Rarely
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="1-2 times/week">
                                            1-2 times/week
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="3-5 times/week">
                                            3-5 times/week
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Daily">
                                            Daily
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="sleepQuality">Sleep Quality</FieldLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button type="button" variant="outline" className="w-56 justify-between font-normal" disabled={isPosting}>
                                        {sleepQuality || "Select sleep quality"}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Sleep Quality</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={sleepQuality}
                                        onValueChange={setSleepQuality}
                                    >
                                        <DropdownMenuRadioItem value="Very Good">
                                            Very Good
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Good">
                                            Good
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Average">
                                            Average
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Poor">
                                            Poor
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Field>
                    </FieldSet>

                    <Field orientation="horizontal">
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isPosting}
                        >
                            Submit
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
