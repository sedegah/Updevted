import { Link, useLocation } from "wouter";

export default function MobileNavigation() {
  const [location] = useLocation();
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800 px-4 py-3 z-50">
      <div className="flex justify-between">
        <Link 
          href="/" 
          className={`flex items-center justify-center w-12 h-12 rounded-full ${location === '/' ? 'text-primary bg-primary/10' : 'text-gray-500 dark:text-gray-400'}`}
          title="Home - Latest tech news & articles"
          aria-label="Home"
        >
          <i className="material-icons">home</i>
        </Link>
        
        <Link 
          href="/github-trends"
          className={`flex items-center justify-center w-12 h-12 rounded-full ${location === '/github-trends' ? 'text-primary bg-primary/10' : 'text-gray-500 dark:text-gray-400'}`}
          title="GitHub - Popular repositories & developers"
          aria-label="GitHub Trends"
        >
          <i className="material-icons">trending_up</i>
        </Link>
        
        <Link 
          href="/career-roadmaps"
          className={`flex items-center justify-center w-12 h-12 rounded-full ${location.startsWith('/career-roadmaps') ? 'text-primary bg-primary/10' : 'text-gray-500 dark:text-gray-400'}`}
          title="Roadmaps - Learning paths for tech careers"
          aria-label="Career Roadmaps"
        >
          <i className="material-icons">route</i>
        </Link>
        
        <Link 
          href="/ai-assistant"
          className={`flex items-center justify-center w-12 h-12 rounded-full ${location === '/ai-assistant' ? 'text-primary bg-primary/10' : 'text-gray-500 dark:text-gray-400'}`}
          title="AI - Summarize, explain & compare tech"
          aria-label="AI Assistant"
        >
          <i className="material-icons">smart_toy</i>
        </Link>
        
        <Link 
          href="/bookmarks"
          className={`flex items-center justify-center w-12 h-12 rounded-full ${location === '/bookmarks' ? 'text-primary bg-primary/10' : 'text-gray-500 dark:text-gray-400'}`}
          title="Saved - Your bookmarked content"
          aria-label="Bookmarks"
        >
          <i className="material-icons">bookmark</i>
        </Link>
      </div>
    </nav>
  );
}
