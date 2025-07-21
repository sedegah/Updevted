import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { getCodeExplanation, getTechComparison, getLearningPath, testAIConnection } from "../lib/ai-client";
import { CodeExplanationResponse, TechComparisonResponse } from "../lib/groq-service";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle, Code, Compass, GraduationCap, RefreshCw } from "lucide-react";

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState("code-explanation");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'connected' | 'error'>('untested');

  // Code Explanation
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState<CodeExplanationResponse | null>(null);

  // Tech Comparison
  const [technologies, setTechnologies] = useState("");
  const [comparison, setComparison] = useState<TechComparisonResponse | null>(null);

  // Learning Path
  const [technology, setTechnology] = useState("");
  const [learningPath, setLearningPath] = useState<string[] | null>(null);

  const handleTestConnection = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await testAIConnection();
      setConnectionStatus(result.status === 'success' ? 'connected' : 'error');
    } catch (err: any) {
      setConnectionStatus('error');
      setError(err.message || 'Failed to connect to AI service');
    } finally {
      setIsLoading(false);
    }
  };



  const handleCodeExplanation = async () => {
    if (!code.trim()) {
      setError('Please enter some code');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await getCodeExplanation(code, language);
      setExplanation(result);
    } catch (err: any) {
      setError(err.message || 'Failed to explain code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTechComparison = async () => {
    const techArray = technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(Boolean);
    
    if (techArray.length < 2) {
      setError('Please enter at least two technologies separated by commas');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTechComparison(techArray);
      setComparison(result);
    } catch (err: any) {
      setError(err.message || 'Failed to compare technologies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLearningPath = async () => {
    if (!technology.trim()) {
      setError('Please enter a technology');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await getLearningPath(technology);
      setLearningPath(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate learning path');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 sm:px-6 py-4 sm:py-8 max-w-full sm:max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleTestConnection}
            disabled={isLoading}
            className="flex items-center"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            <span className="whitespace-nowrap">Test Connection</span>
          </Button>
          {connectionStatus === 'connected' && (
            <Badge variant="outline" className="bg-green-500 text-white">
              <CheckCircle className="h-3 w-3 mr-1" /> Connected
            </Badge>
          )}
          {connectionStatus === 'error' && (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" /> Error
            </Badge>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Mobile navigation tabs - circular icon only buttons */}
      <div className="sm:hidden mb-6 overflow-hidden">
        <div className="py-2">
          <div className="flex justify-around">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => setActiveTab("code-explanation")}
                    className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg ${
                      activeTab === "code-explanation" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-light-bg dark:bg-dark-hover text-gray-500"
                    }`}
                    aria-label="Code Explanation"
                  >
                    <Code className="h-7 w-7 mb-1" />
                    <span className="text-xs">Code</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Understand any code snippet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => setActiveTab("tech-comparison")}
                    className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg ${
                      activeTab === "tech-comparison" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-light-bg dark:bg-dark-hover text-gray-500"
                    }`}
                    aria-label="Technology Comparison"
                  >
                    <Compass className="h-7 w-7 mb-1" />
                    <span className="text-xs">Compare</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compare frameworks & languages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => setActiveTab("learning-path")}
                    className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg ${
                      activeTab === "learning-path" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-light-bg dark:bg-dark-hover text-gray-500"
                    }`}
                    aria-label="Learning Path"
                  >
                    <GraduationCap className="h-7 w-7 mb-1" />
                    <span className="text-xs">Learn</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate study plans for technologies</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      {/* Desktop tabs - icon with text shadcn Tabs component */}
      <div className="hidden sm:block mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 gap-2">
            <TabsTrigger 
              value="code-explanation" 
              className="flex items-center justify-center py-3 gap-2"
              title="Code Explanation - Understand any code snippet"
              aria-label="Code Explanation"
            >
              <Code className="h-5 w-5" />
              <span>Code Explanation</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="tech-comparison" 
              className="flex items-center justify-center py-3 gap-2"
              title="Tech Comparison - Compare frameworks & languages"
              aria-label="Technology Comparison"
            >
              <Compass className="h-5 w-5" />
              <span>Tech Comparison</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="learning-path" 
              className="flex items-center justify-center py-3 gap-2"
              title="Learning Path - Generate study plans for technologies"
              aria-label="Learning Path"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Learning Path</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4"
        // This Tabs component will be hidden but handles the content switching
        // We've separated the visual tabs from this component for mobile
      >



        {/* Code Explanation */}
        <TabsContent value="code-explanation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Explanation</CardTitle>
              <CardDescription>
                Paste some code to get a clear explanation of what it does
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Programming Language
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="php">PHP</option>
                  <option value="typescript">TypeScript</option>
                  <option value="ruby">Ruby</option>
                  <option value="go">Go</option>
                  <option value="swift">Swift</option>
                  <option value="kotlin">Kotlin</option>
                </select>
              </div>
              <Textarea 
                placeholder="Paste your code here..."
                className="min-h-[200px] font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleCodeExplanation}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Explain Code'}
              </Button>
            </CardFooter>
          </Card>

          {explanation && (
            <Card>
              <CardHeader>
                <CardTitle>Code Explanation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Explanation</h3>
                  <p className="text-sm">{explanation.explanation}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Key Concepts</h3>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    {explanation.concepts.map((concept, index) => (
                      <li key={index} className="text-sm break-words">{concept}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Best Practices</h3>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    {explanation.bestPractices.map((practice, index) => (
                      <li key={index} className="text-sm break-words">{practice}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tech Comparison */}
        <TabsContent value="tech-comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technology Comparison</CardTitle>
              <CardDescription>
                Compare different technologies to understand their pros and cons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Technologies (comma-separated)
                  </label>
                  <Input 
                    placeholder="e.g., React, Vue, Angular"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleTechComparison}
                disabled={isLoading}
              >
                {isLoading ? 'Comparing...' : 'Compare Technologies'}
              </Button>
            </CardFooter>
          </Card>

          {comparison && (
            <Card>
              <CardHeader>
                <CardTitle>Comparison Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Comparison</h3>
                  <p className="text-sm">{comparison.comparison}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Pros & Cons</h3>
                  <div className="space-y-4">
                    {Object.entries(comparison.prosCons).map(([tech, prosCons]) => (
                      <div key={tech} className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">{tech}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-green-600 dark:text-green-400 mb-1">Pros</h5>
                            <ul className="list-disc list-outside pl-5 space-y-2">
                              {prosCons.pros.map((pro, index) => (
                                <li key={index} className="text-sm break-words">{pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-600 dark:text-red-400 mb-1">Cons</h5>
                            <ul className="list-disc list-outside pl-5 space-y-2">
                              {prosCons.cons.map((con, index) => (
                                <li key={index} className="text-sm break-words">{con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Recommendation</h3>
                  <p className="text-sm">{comparison.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Learning Path */}
        <TabsContent value="learning-path" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Path Generator</CardTitle>
              <CardDescription>
                Generate a step-by-step learning path for any technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Technology Name
                </label>
                <Input 
                  placeholder="e.g., React, Machine Learning, Cloud Computing"
                  value={technology}
                  onChange={(e) => setTechnology(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleLearningPath}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Learning Path'}
              </Button>
            </CardFooter>
          </Card>

          {learningPath && (
            <Card>
              <CardHeader>
                <CardTitle>Learning Path for {technology}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-outside space-y-4 pl-5">
                  {learningPath.map((step, index) => (
                    <li key={index} className="text-sm break-words pb-2">
                      <span className="font-medium">{(step.includes(':') ? step.split(':')[0] : `Step ${index + 1}`) + ': '}</span>
                      <span>{step.includes(':') ? step.split(':').slice(1).join(':').trim() : step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}