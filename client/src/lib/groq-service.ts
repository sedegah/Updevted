import { Groq } from 'groq-sdk';

// Initialize Groq client with API key from environment variable
let groqClient: Groq | null = null;

try {
  const apiKey = typeof process !== 'undefined' && process.env.GROQ_API_KEY ? 
    process.env.GROQ_API_KEY : 
    null;
    
  if (apiKey) {
    groqClient = new Groq({
      apiKey,
    });
  } else {
    console.warn('GROQ_API_KEY environment variable not found');
  }
} catch (error) {
  console.error('Failed to initialize Groq client:', error);
}



export interface CodeExplanationResponse {
  explanation: string;
  concepts: string[];
  bestPractices: string[];
}

export interface TechComparisonResponse {
  comparison: string;
  prosCons: {
    [tech: string]: {
      pros: string[];
      cons: string[];
    };
  };
  recommendation: string;
}



/**
 * Explains code snippets with plain language explanations
 */
export async function explainCode(code: string, language: string): Promise<CodeExplanationResponse | null> {
  if (!groqClient) {
    console.error('Groq client not initialized.');
    return null;
  }

  try {
    const prompt = `
    Please explain this ${language} code snippet in clear, simple terms. Return your response in JSON format:
    {
      "explanation": "A clear explanation of what this code does",
      "concepts": ["Concept 1", "Concept 2", "Concept 3"],
      "bestPractices": ["Best practice 1", "Best practice 2"]
    }

    Code:
    \`\`\`${language}
    ${code}
    \`\`\`
    `;

    const response = await groqClient.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a coding tutor who explains code in simple, understandable terms. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const jsonResponse = response.choices[0]?.message?.content;
    
    if (jsonResponse) {
      return JSON.parse(jsonResponse) as CodeExplanationResponse;
    }
    
    return null;
  } catch (error) {
    console.error('Error explaining code:', error);
    return null;
  }
}

/**
 * Compares different technologies and provides pros and cons
 */
export async function compareTechnologies(technologies: string[]): Promise<TechComparisonResponse | null> {
  if (!groqClient) {
    console.error('Groq client not initialized.');
    return null;
  }

  try {
    const techsString = technologies.join(', ');
    const promsConsTemplate = technologies.map(tech => 
      `"${tech}": { "pros": ["Pro 1", "Pro 2", "Pro 3"], "cons": ["Con 1", "Con 2", "Con 3"] }`
    ).join(',\n      ');

    const prompt = `
    Please compare these technologies: ${techsString}. Return your response in JSON format:
    {
      "comparison": "A concise comparison of the technologies",
      "prosCons": {
        ${promsConsTemplate}
      },
      "recommendation": "Your recommendation on when to use each technology"
    }
    `;

    const response = await groqClient.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a technology consultant who provides objective comparisons of different technologies. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const jsonResponse = response.choices[0]?.message?.content;
    
    if (jsonResponse) {
      return JSON.parse(jsonResponse) as TechComparisonResponse;
    }
    
    return null;
  } catch (error) {
    console.error('Error comparing technologies:', error);
    return null;
  }
}

/**
 * Generate learning path recommendations for a specific technology
 */
export async function generateLearningPath(technology: string): Promise<string[] | null> {
  if (!groqClient) {
    console.error('Groq client not initialized.');
    return null;
  }

  try {
    const prompt = `
    Generate a learning path for someone who wants to learn ${technology}. 
    Return your response as a JSON array of steps, each describing what to learn and in what order.
    Example format: ["Step 1: Basic concepts", "Step 2: Intermediate skills", "Step 3: Advanced topics"]
    `;

    const response = await groqClient.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a tech education expert who creates learning paths for developers. Return only a valid JSON array.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const jsonResponse = response.choices[0]?.message?.content;
    
    if (jsonResponse) {
      const parsed = JSON.parse(jsonResponse);
      return Array.isArray(parsed) ? parsed : (parsed.steps || parsed.path || []);
    }
    
    return null;
  } catch (error) {
    console.error('Error generating learning path:', error);
    return null;
  }
}