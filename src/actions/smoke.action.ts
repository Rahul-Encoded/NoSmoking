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
