import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export default function TabNavigation({ 
  activeTab, 
  onTabChange, 
  isRefreshing = false, 
  onRefresh 
}: TabNavigationProps) {
  const tabs = [
    { id: 'for-you', name: 'For You', icon: 'thumb_up' },
    { id: 'latest', name: 'Latest', icon: 'schedule' },
    { id: 'popular', name: 'Popular', icon: 'trending_up' }
  ];
  
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`font-space flex items-center whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'font-bold pb-3 px-3 sm:px-4 border-b-2 border-primary text-primary' 
                  : 'font-medium pb-3 px-3 sm:px-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.name}
            >
              <span className="material-icons text-sm mr-1 sm:mr-2">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
        
        {onRefresh && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 ml-2 flex-shrink-0"
            aria-label="Refresh content"
          >
            <RefreshCw 
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''} ${window.innerWidth < 400 ? '' : 'mr-1'}`} 
            />
            <span className="text-xs hidden sm:inline">Refresh</span>
          </Button>
        )}
      </div>
    </div>
  );
}
