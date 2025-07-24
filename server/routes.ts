import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Groq } from 'groq-sdk';
import { 
  explainCode, 
  compareTechnologies, 
  generateLearningPath 
} from "../client/src/lib/groq-service";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get('/manifest.json', (req, res) => {
    res.json({
      "name": "Updevted",
      "short_name": "Updevted",
      "description": "Stay ahead in tech with the latest tools, trends, and discussions",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#15202B",
      "theme_color": "#1DA1F2",
      "icons": [
        {
          "src": "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4bb.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4bb.svg",
          "sizes": "150x150",
          "type": "image/svg+xml"
        }
      ]
    });
  });

  

  app.post('/api/ai/explain-code', async (req: Request, res: Response) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({ error: 'Code and language are required' });
      }
      
      const explanation = await explainCode(code, language);
      
      if (!explanation) {
        return res.status(500).json({ error: 'Failed to explain code' });
      }
      
      res.json(explanation);
    } catch (error) {
      console.error('Error in /api/ai/explain-code:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/ai/compare-tech', async (req: Request, res: Response) => {
    try {
      const { technologies } = req.body;
      
      if (!technologies || !Array.isArray(technologies) || technologies.length < 2) {
        return res.status(400).json({ error: 'At least two technologies are required' });
      }
      
      const comparison = await compareTechnologies(technologies);
      
      if (!comparison) {
        return res.status(500).json({ error: 'Failed to compare technologies' });
      }
      
      res.json(comparison);
    } catch (error) {
      console.error('Error in /api/ai/compare-tech:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/ai/learning-path', async (req: Request, res: Response) => {
    try {
      const { technology } = req.body;
      
      if (!technology) {
        return res.status(400).json({ error: 'Technology is required' });
      }
      
      const learningPath = await generateLearningPath(technology);
      
      if (!learningPath) {
        return res.status(500).json({ error: 'Failed to generate learning path' });
      }
      
      res.json(learningPath);
    } catch (error) {
      console.error('Error in /api/ai/learning-path:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Simple API key test endpoint
  app.get('/api/ai/test-connection', async (_req: Request, res: Response) => {
    try {
      const apiKey = process.env.GROQ_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'GROQ API key is not configured',
          status: 'error' 
        });
      }
      
    
      const groqClient = new Groq({ apiKey });
      const response = await groqClient.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: 'Say hello' }],
        max_tokens: 5,
      });
      
      if (response?.choices?.[0]?.message?.content) {
        return res.json({ 
          status: 'success',
          message: 'GROQ API connection successful'
        });
      } else {
        return res.status(500).json({ 
          error: 'Failed to get a valid response from GROQ API',
          status: 'error' 
        });
      }
    } catch (error: any) {
      console.error('Error testing GROQ API connection:', error);
      return res.status(500).json({ 
        error: error?.message || 'Internal server error',
        status: 'error' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
