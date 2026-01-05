import { GoogleGenAI, Type } from "@google/genai";
import { BirthdayWish } from "../types";

export const generateBirthdayMessage = async (): Promise<BirthdayWish> => {
  // Use the API key injected from Netlify Environment Variables
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing. Please set it in your Netlify Environment Variables.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Write a short, beautiful, and poetic birthday message for 'Rosell'. The message should be warm, elegant, and celebrate her life and beauty. Return it in JSON format.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            poem: { type: Type.STRING },
            closing: { type: Type.STRING }
          },
          required: ["title", "poem", "closing"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: "To dearest Sel,",
      poem: "On this day, the sun shines a little brighter for you. May your path be filled with flowers, your heart with laughter, and your soul with the peace you bring to everyone around you.",
      closing: "Wishing you a day as luminous as your soul. Happy Birthday, Sel! With love, always NiKz."
    };
  }
};
