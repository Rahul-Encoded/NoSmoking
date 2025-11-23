"use server";

import { dbUser } from "./user.actions";
import prisma from "@/lib/prisma";

export async function logSmoke() {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            throw new Error("User not found");
        }

        // Check if there's a non-smoke log for today and delete it if it exists
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingNonSmokeLog = await prisma.nonSmokeLogs.findFirst({
            where: {
                userId: userId,
                timestamp: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        if (existingNonSmokeLog) {
            await prisma.nonSmokeLogs.delete({
                where: {
                    id: existingNonSmokeLog.id,
                },
            });
        }

        const smokeLog = await prisma.smokeLogs.create({
            data: {
                userId: userId,
            },
        });

        return { success: true, smokeLog };
    } catch (error) {
        console.error("Error in logSmoke", error);
        return { success: false, error };
    }
}

export async function logNoSmoke() {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            throw new Error("User not found");
        }

        // Check if already smoked today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingSmokeLog = await prisma.smokeLogs.findFirst({
            where: {
                userId: userId,
                timestamp: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        if (existingSmokeLog) {
            return { success: false, error: "Already smoked today" };
        }

        const nonSmokeLog = await prisma.nonSmokeLogs.create({
            data: {
                userId: userId,
            },
        });

        return { success: true, nonSmokeLog };
    } catch (error) {
        console.error("Error in logNoSmoke", error);
        return { success: false, error };
    }
}

export async function getDailyLogStatus() {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            return { hasSmoked: false, hasLoggedNoSmoke: false };
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const [smokeLog, nonSmokeLog] = await Promise.all([
            prisma.smokeLogs.findFirst({
                where: {
                    userId: userId,
                    timestamp: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            }),
            prisma.nonSmokeLogs.findFirst({
                where: {
                    userId: userId,
                    timestamp: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            }),
        ]);

        return {
            hasSmoked: !!smokeLog,
            hasLoggedNoSmoke: !!nonSmokeLog,
        };
    } catch (error) {
        console.error("Error in getDailyLogStatus", error);
        return { hasSmoked: false, hasLoggedNoSmoke: false };
    }
}

export async function checkAndBackfillLogs() {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            return;
        }

        // Get the user's creation date or the last logged date
        // For simplicity, let's look at the last 30 days max to avoid huge loops on old inactive accounts
        // or start from user creation date if it's recent.
        // Actually, let's just check the last few days for now or since the last known log.

        // Strategy: Find the last recorded log (smoke or non-smoke). 
        // Iterate from that day + 1 until yesterday.
        // If no log exists for a day, create a non-smoke log.

        // Optimization: Just check the last 7 days for now to be safe and fast.
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 1; i <= 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);

            const startOfCheckDate = new Date(checkDate);
            startOfCheckDate.setHours(0, 0, 0, 0);
            const endOfCheckDate = new Date(checkDate);
            endOfCheckDate.setHours(23, 59, 59, 999);

            const [smokeLog, nonSmokeLog] = await Promise.all([
                prisma.smokeLogs.findFirst({
                    where: {
                        userId: userId,
                        timestamp: {
                            gte: startOfCheckDate,
                            lte: endOfCheckDate,
                        },
                    },
                }),
                prisma.nonSmokeLogs.findFirst({
                    where: {
                        userId: userId,
                        timestamp: {
                            gte: startOfCheckDate,
                            lte: endOfCheckDate,
                        },
                    },
                }),
            ]);

            if (!smokeLog && !nonSmokeLog) {
                // No logs for this day, so they didn't smoke. Backfill.
                await prisma.nonSmokeLogs.create({
                    data: {
                        userId: userId,
                        timestamp: startOfCheckDate, // Set timestamp to that day
                    },
                });
                console.log(`Backfilled non-smoke log for ${startOfCheckDate.toDateString()}`);
            }
        }

    } catch (error) {
        console.error("Error in checkAndBackfillLogs", error);
    }
}

export async function getSmokeCount() {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            return 0;
        }

        const count = await prisma.smokeLogs.count({
            where: {
                userId: userId,
            },
        });

        return count;
    } catch (error) {
        console.error("Error in getSmokeCount", error);
        return 0;
    }
}

export async function getSmokeHistory() {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            return { smokedDates: [], notSmokedDates: [] };
        }

        const [smokeLogs, nonSmokeLogs] = await Promise.all([
            prisma.smokeLogs.findMany({
                where: { userId: userId },
                select: { timestamp: true },
            }),
            prisma.nonSmokeLogs.findMany({
                where: { userId: userId },
                select: { timestamp: true },
            }),
        ]);

        return {
            smokedDates: smokeLogs.map((log) => log.timestamp.toISOString()),
            notSmokedDates: nonSmokeLogs.map((log) => log.timestamp.toISOString()),
        };
    } catch (error) {
        console.error("Error in getSmokeHistory", error);
        return { smokedDates: [], notSmokedDates: [] };
    }
}

export async function updateDailyStatus(date: Date, status: 'smoked' | 'not-smoked') {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            throw new Error("User not found");
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Helper to delete logs for the day
        const deleteLogs = async () => {
            await prisma.smokeLogs.deleteMany({
                where: {
                    userId: userId,
                    timestamp: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });
            await prisma.nonSmokeLogs.deleteMany({
                where: {
                    userId: userId,
                    timestamp: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });
        };

        if (status === 'smoked') {
            await deleteLogs();
            await prisma.smokeLogs.create({
                data: {
                    userId: userId,
                    timestamp: startOfDay, // Log at start of day for simplicity in history
                },
            });
        } else if (status === 'not-smoked') {
            await deleteLogs();
            await prisma.nonSmokeLogs.create({
                data: {
                    userId: userId,
                    timestamp: startOfDay,
                },
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error in updateDailyStatus", error);
        return { success: false, error };
    }
}

export async function backfillHistoricalSmokeLogs(durationInYears: number, dailyAvg: number) {
    try {
        const user = await dbUser();
        const userId = user?.id;

        if (!userId) {
            throw new Error("User not found");
        }

        // Calculate the start date based on duration
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(today);
        // Convert years to days and subtract from today
        const daysToSubtract = Math.floor(durationInYears * 365);
        startDate.setDate(today.getDate() - daysToSubtract);
        startDate.setHours(0, 0, 0, 0);

        console.log(`Backfilling smoke logs from ${startDate.toDateString()} to ${today.toDateString()}`);

        // Create smoke logs for each day based on daily average
        const smokeLogs = [];
        const currentDate = new Date(startDate);

        while (currentDate < today) {
            // For each day, create entries based on dailyAvg
            // We'll create one log per day at the start of the day for simplicity
            // The actual count is tracked by dailyAvg in calculations
            const logTimestamp = new Date(currentDate);
            logTimestamp.setHours(12, 0, 0, 0); // Set to noon for consistency

            smokeLogs.push({
                userId: userId,
                timestamp: logTimestamp,
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Batch create all smoke logs
        if (smokeLogs.length > 0) {
            await prisma.smokeLogs.createMany({
                data: smokeLogs,
                skipDuplicates: true, // Skip if logs already exist for these timestamps
            });
            console.log(`Created ${smokeLogs.length} historical smoke logs`);
        }

        return { success: true, count: smokeLogs.length };
    } catch (error) {
        console.error("Error in backfillHistoricalSmokeLogs", error);
        return { success: false, error };
    }
}

