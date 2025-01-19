import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeSymptoms(symptoms: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze the following symptoms and provide a detailed medical analysis. Include:
    1. Possible conditions
    2. Precautions and immediate steps
    3. When to seek medical attention
    4. Lifestyle recommendations
    
    Symptoms: ${symptoms}
    
    Note: This is not a substitute for professional medical advice.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms. Please try again.');
  }
}