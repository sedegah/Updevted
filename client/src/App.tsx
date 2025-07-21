import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import GitHubTrends from "@/pages/GitHubTrends";
import CareerRoadmaps from "@/pages/CareerRoadmaps";
import RoadmapDetail from "@/pages/RoadmapDetail";
import Bookmarks from "@/pages/Bookmarks";
import AIAssistant from "@/pages/AIAssistant";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import { useEffect, useState } from "react";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      setIsRefreshing(true);
      queryClient.invalidateQueries();
      setTimeout(() => setIsRefreshing(false), 1000);
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
        <Header isRefreshing={isRefreshing} onRefresh={() => {
          setIsRefreshing(true);
          queryClient.invalidateQueries();
          setTimeout(() => setIsRefreshing(false), 1000);
        }} />
        
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/github-trends" component={GitHubTrends} />
          <Route path="/career-roadmaps" component={CareerRoadmaps} />
          <Route path="/career-roadmaps/:id" component={RoadmapDetail} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/ai-assistant" component={AIAssistant} />
          <Route component={NotFound} />
        </Switch>
        
        <MobileNavigation />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
