// Represents a part of the generative content, such as analysis output or inline data
export interface AnalysisContentPart {
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string; // Base64-encoded data, e.g., for images or other binary content
    };
  }
  
  // Represents the structure for generative content, e.g., analysis results
  export interface NutritionAnalysisContent {
    parts: AnalysisContentPart[];
  }
  
  // Configuration for generating nutrition analysis content
  export interface NutritionAnalysisConfig {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  }
  
  // Request payload for generating nutrition analysis content
  export interface NutritionAnalysisRequest {
    contents: NutritionAnalysisContent[];
    generationConfig?: NutritionAnalysisConfig;
  }
  
  // Response structure for generated nutrition analysis
  export interface NutritionAnalysisResponse {
    candidates: {
      content: {
        parts: {
          text: string; // Text output of the analysis
        }[];
      };
    }[];
  }
  
  // Represents the result of a nutrition analysis for a given food item
  export interface NutritionResult {
    calories: number; // Total calories
    macronutrients: {
      protein: string; // Protein content (e.g., "10g")
      carbs: string; // Carbohydrates content (e.g., "15g")
      fats: string; // Fat content (e.g., "5g")
    };
    vitamins: Record<string, string>; // Vitamin information (e.g., "Vitamin C: 20mg")
    minerals: Record<string, string>; // Mineral information (e.g., "Calcium: 100mg")
    otherDetails?: string; // Optional field for additional analysis details
  }
  
  // Represents errors from the API or the analysis process
  export interface NutritionAnalysisError {
    message: string; // Error message
    code?: number; // Optional error code
  }
  