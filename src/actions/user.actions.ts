"use server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
	try {
		const { userId } = await auth();
		const user = await currentUser()

		console.log("USER", user);

		if (!userId || !user) return;

		const existingUser = await prisma.user.findUnique({
			where: {
				clerkId: userId,
			},
		});

		if (existingUser) return existingUser;

		const dbUser = await prisma.user.create({
			data: {
				clerkId: userId,
				name: `${user.firstName || ""} ${user.lastName || ""}`,
				username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
				email: user.emailAddresses[0].emailAddress,
				image: user.imageUrl,
			},
		});

		console.log("DBUSER", dbUser);

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

export async function updateUserData(date: Date, cost: number, dailyAvg: number, duration: number) {
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
				dob: date,
				costPerCigg: cost,
				initDailyAvg: dailyAvg,
				duration: duration,
			}
		});

		return { success: true, update };
	} catch (error) {
		console.error("Error in updateUserData", error);
		return { success: false, error }
	}
}