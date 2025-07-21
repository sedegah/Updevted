import { Link, useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export default function Header({ isRefreshing, onRefresh }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  const [location] = useLocation();
  
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      // If system, explicitly set to the opposite of current system preference
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemIsDark ? "light" : "dark");
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-2 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-primary font-space">
            Updevted
          </Link>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-1 ml-4">
              <Link href="/" className={`px-3 py-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover font-medium text-sm flex items-center ${location === '/' ? 'text-primary' : ''}`}>
                <span className="material-icons text-sm mr-1">home</span>
                <span>Home</span>
              </Link>
              
              <Link href="/github-trends" className={`px-3 py-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover font-medium text-sm flex items-center ${location === '/github-trends' ? 'text-primary' : ''}`}>
                <span className="material-icons text-sm mr-1">trending_up</span>
                <span>GitHub Trends</span>
              </Link>
              
              <Link href="/career-roadmaps" className={`px-3 py-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover font-medium text-sm flex items-center ${location.startsWith('/career-roadmaps') ? 'text-primary' : ''}`}>
                <span className="material-icons text-sm mr-1">route</span>
                <span>Career Roadmaps</span>
              </Link>
              
              <Link href="/ai-assistant" className={`px-3 py-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover font-medium text-sm flex items-center ${location === '/ai-assistant' ? 'text-primary' : ''}`}>
                <span className="material-icons text-sm mr-1">smart_toy</span>
                <span>AI Assistant</span>
              </Link>
              
              <Link href="/bookmarks" className={`px-3 py-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover font-medium text-sm flex items-center ${location === '/bookmarks' ? 'text-primary' : ''}`}>
                <span className="material-icons text-sm mr-1">bookmark</span>
                <span>Bookmarks</span>
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search articles, topics..." 
              className="rounded-full bg-light-bg dark:bg-dark-hover py-2 px-4 pl-10 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary text-sm w-full"
            />
            <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
              <span className="material-icons text-base sm:text-lg">light_mode</span>
            ) : (
              <span className="material-icons text-base sm:text-lg">dark_mode</span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1.5 sm:p-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover"
            aria-label="Refresh content"
          >
            {isRefreshing ? (
              <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 rounded-full animate-spin" />
            ) : (
              <span className="material-icons text-base sm:text-lg">refresh</span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
