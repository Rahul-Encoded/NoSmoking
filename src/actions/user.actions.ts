"use server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
	try {
		const { userId } = await auth();
		const user = await currentUser()

		if (!userId || !user) return;

		const dbUser = await prisma.user.upsert({
			where: {
				clerkId: userId,
			},
			update: {
				name: `${user.firstName || ""} ${user.lastName || ""}`,
				email: user.emailAddresses[0].emailAddress,
				image: user.imageUrl,
			},
			create: {
				clerkId: userId,
				name: `${user.firstName || ""} ${user.lastName || ""}`,
				username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
				email: user.emailAddresses[0].emailAddress,
				image: user.imageUrl,
			},
		});

		return dbUser;

	} catch (error) {
		console.log("Error in syncUser", error);
		throw error;
	}
}

export async function getUserByClerkId(clerkId: string) {
	// console.log("Fetching user by Clerk ID:", clerkId);

	const user = await prisma.user.findUnique({
		where: { clerkId },
	});

	if (!user) {
		console.error("No user found for Clerk ID:", clerkId);
	}

	return user;
}


export async function dbUser() {

	const { userId: clerkId } = await auth();

	if (!clerkId) return null;

	const user = await getUserByClerkId(clerkId);

	if (!user) throw new Error("User Not found");

	return user;


}

export async function updateUserData(data: {
	date?: Date;
	cost?: number;
	dailyAvg?: number;
	duration?: number;
	location?: string;
	physicalActivity?: string;
	jobHours?: number;
	dietQuality?: string;
	eatingOutFrequency?: string;
	sleepQuality?: string;
	initLifeExpectancy?: number;
	currLifeExpectancy?: number;
	totalSmokes?: number;
}) {
	try {
		const user = await dbUser();
		const userId = user?.id;
		console.log("USERID", userId);
		if (!userId) return;

		const update = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				dob: data.date,
				costPerCigg: data.cost,
				initDailyAvg: data.dailyAvg,
				duration: data.duration,
				location: data.location,
				physicalActivity: data.physicalActivity,
				jobHours: data.jobHours,
				dietQuality: data.dietQuality,
				eatingOutFrequency: data.eatingOutFrequency,
				sleepQuality: data.sleepQuality,
				initLifeExpectancy: data.initLifeExpectancy,
				totalSmokes: data.totalSmokes,
			}
		});

		return { success: true, update };
	} catch (error) {
		console.error("Error in updateUserData", error);
		return { success: false, error }
	}
}