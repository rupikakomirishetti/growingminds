import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getDevelopmentalInsight = async (ageGroup: string, recentActivities: string[]) => {
  if (!apiKey) {
    console.warn("API Key is missing for Gemini Service");
    return {
        title: "Simulation Mode",
        content: "Please provide a valid API Key to get real AI insights. For now: Focus on reading aloud to improve vocabulary!"
    };
  }

  try {
    const prompt = `
      Act as an expert child development specialist.
      The child is in the "${ageGroup}" age group.
      Recent activities include: ${recentActivities.join(', ')}.
      
      Provide a short, encouraging "Daily Insight" for the parent. 
      It should include:
      1. A brief comment on why recent activities are good.
      2. A suggestion for a simple home activity to reinforce learning.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for the insight" },
            content: { type: Type.STRING, description: "The advice text (max 50 words)" }
          },
          required: ["title", "content"]
        }
      }
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
        title: "Insight Unavailable",
        content: "We couldn't generate a new insight right now. Try playing a matching game with shapes!"
    };
  }
};
