import { GoogleGenAI, Type } from "@google/genai";
import type { SolutionData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const textModel = 'gemini-2.5-flash';

export const getPhysicsSolution = async (
  problem: string,
  setLoadingMessage: (message: string) => void
): Promise<SolutionData> => {
  try {
    setLoadingMessage('Analyzing the problem and deriving the solution...');
    
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        solution: {
          type: Type.STRING,
          description: "A detailed, step-by-step solution to the physics problem. Use markdown for formulas and mathematical notation."
        },
        explanation: {
          type: Type.STRING,
          description: "An explanation of the core physics concepts involved, including a real-life example."
        },
        imagePrompt: {
          type: Type.STRING,
          description: "A descriptive, detailed prompt for an image generation model to create a photorealistic image illustrating the real-life example. The prompt should be creative and visually rich."
        }
      },
      required: ["solution", "explanation", "imagePrompt"]
    };

    const result = await ai.models.generateContent({
      model: textModel,
      contents: `Solve the following physics problem. Provide a step-by-step solution, explain the core concepts with a real-life example, and create a prompt for an image generation AI to visualize the example.
Problem: "${problem}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const textResponse = result.text;
    const parsedResponse = JSON.parse(textResponse);

    const { solution, explanation, imagePrompt } = parsedResponse;

    setLoadingMessage('Generating a real-life example image...');

    const imageResult = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });
    
    const base64ImageBytes: string = imageResult.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

    return {
      solution,
      explanation,
      imageUrl
    };

  } catch (error) {
    console.error("Error in getPhysicsSolution:", error);
    if (error instanceof Error && error.message.includes('API key')) {
       throw new Error("API Key error. Please ensure it is correctly configured.");
    }
    throw new Error("Failed to get solution from the AI service. The model may be unable to process this request.");
  }
};
