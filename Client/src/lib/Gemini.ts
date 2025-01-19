import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface AnalysisOptions {
  symptoms: string;
  includeConditions?: boolean; // Include possible conditions
  includePrecautions?: boolean; // Include precautions and immediate steps
  includeMedicalAttention?: boolean; // When to seek medical attention
  includeLifestyleRecommendations?: boolean; // Include lifestyle recommendations
}

export async function analyzeSymptoms(options: AnalysisOptions): Promise<string> {
  const {
    symptoms,
    includeConditions = true,
    includePrecautions = true,
    includeMedicalAttention = true,
    includeLifestyleRecommendations = true,
  } = options;

  let prompt = `Analyze the following symptoms and provide a detailed response based on the specified sections:\n\nSymptoms: ${symptoms}\n\nInclude:\n`;
  if (includeConditions) prompt += "1. Possible conditions\n";
  if (includePrecautions) prompt += "2. Precautions and immediate steps\n";
  if (includeMedicalAttention) prompt += "3. When to seek medical attention\n";
  if (includeLifestyleRecommendations) prompt += "4. Lifestyle recommendations\n\n";
  prompt += "Note: This is not a substitute for professional medical advice.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    return "An error occurred while analyzing symptoms. Please ensure the input is correct and try again. If the issue persists, consult a medical professional.";
  }
}

// Refactor for general chatbot conversation
export async function generateChatResponse(userMessage: string, systemPrompt: string): Promise<string> {
  const prompt = `${systemPrompt}\nUser: ${userMessage}\nAssistant:`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "I'm having trouble responding. Please try again later.";
  }
}

// Export functions for both symptom analysis and chatbot
export const geminiUtils = {
  analyzeSymptoms,
  generateChatResponse,
};
