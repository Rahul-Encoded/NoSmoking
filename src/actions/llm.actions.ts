"use server";

import { GoogleGenAI } from '@google/genai';
import { updateUserData } from './user.actions';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function updateLifeExpectancy({ dob, location, physicalActivity, jobHours, dietQuality, eatingOutFrequency, sleepQuality }: {
    dob: Date;
    location: string;
    physicalActivity: string;
    jobHours: number;
    dietQuality: string;
    eatingOutFrequency: string;
    sleepQuality: string;
}) {

    const prompt = `User's details: 
    DOB: ${dob}
    Location: ${location}
    Physical activity: ${physicalActivity}
    Job hours: ${jobHours}
    Diet quality: ${dietQuality}
    Eating out frequency: ${eatingOutFrequency}
    Sleep quality: ${sleepQuality}
    Based on the following user details, calculate and return only the projected life expectancy in years. Do not include any explanations, extraneous text, or other information.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        if (!response) return;

        const lifeExpectancy = Number(response.text);
        const update = await updateUserData({ initLifeExpectancy: lifeExpectancy });

        console.log("Life Expectancy", lifeExpectancy);
        return { success: true, update };
    } catch (error) {
        console.error("Error in updateLifeExpectancy", error);
        return { success: false, error }
    }
}
