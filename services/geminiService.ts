
import { GoogleGenAI, Type } from "@google/genai";
import { AIExplanation } from "../types";

export const getMathExplanation = async (expression: string): Promise<AIExplanation | null> => {
  try {
    // Initializing GoogleGenAI with the API key from process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the calculation "${expression}" in simple terms for a student. Include clear steps.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: "A friendly, high-level summary of what happened.",
            },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of logical steps taken to reach the result.",
            },
            context: {
              type: Type.STRING,
              description: "A fun fact or real-world application related to this type of math.",
            },
          },
          required: ["explanation", "steps", "context"],
        },
      },
    });

    // Accessing the .text property directly as per guidelines and trimming the resulting string
    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      return null;
    }

    const result = JSON.parse(jsonStr);
    return result as AIExplanation;
  } catch (error) {
    console.error("Error fetching AI explanation:", error);
    return null;
  }
};
