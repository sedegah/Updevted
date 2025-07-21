import { 
  CodeExplanationResponse, 
  TechComparisonResponse 
} from "./groq-service";

/**
 * Checks if the AI service is connected and working
 */
export async function testAIConnection(): Promise<{ status: string, message: string }> {
  try {
    const response = await fetch('/api/ai/test-connection');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error testing AI connection:', error);
    throw error;
  }
}



/**
 * Gets an explanation for code
 */
export async function getCodeExplanation(code: string, language: string): Promise<CodeExplanationResponse> {
  try {
    const response = await fetch('/api/ai/explain-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting code explanation:', error);
    throw error;
  }
}

/**
 * Compares technologies
 */
export async function getTechComparison(technologies: string[]): Promise<TechComparisonResponse> {
  try {
    const response = await fetch('/api/ai/compare-tech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ technologies }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error comparing technologies:', error);
    throw error;
  }
}

/**
 * Gets a learning path for a technology
 */
export async function getLearningPath(technology: string): Promise<string[]> {
  try {
    const response = await fetch('/api/ai/learning-path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ technology }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting learning path:', error);
    throw error;
  }
}