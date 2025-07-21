import { Link, useLocation } from "wouter";
import { getTagIcon } from "@/lib/utils";

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  const [location] = useLocation();
  
  const categories = [
    { id: 'all', name: 'All Tech', icon: 'code' },
    { id: 'webdev', name: 'Web Dev', icon: 'web' },
    { id: 'ai', name: 'AI & ML', icon: 'psychology' },
    { id: 'mobile', name: 'Mobile', icon: 'phone_iphone' },
    { id: 'devops', name: 'DevOps', icon: 'settings_suggest' },
    { id: 'cloud', name: 'Cloud', icon: 'cloud' },
    { id: 'design', name: 'UI/UX', icon: 'design_services' }
  ];
  
  const sources = [
    { id: 'all', name: 'All Sources', icon: 'public' },
    { id: 'devto', name: 'Dev.to', icon: 'description' },
    { id: 'hackernews', name: 'Hacker News', icon: 'trending_up' },
    { id: 'reddit', name: 'Reddit', icon: 'forum' }
  ];
  
  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange(categoryName);
  };
  
  return (
    <div className="hidden lg:block w-56 space-y-6">
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
        <h2 className="font-space font-bold text-lg mb-3">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={`flex items-center space-x-2 p-2 w-full text-left rounded-lg font-medium hover:bg-light-hover dark:hover:bg-dark-hover ${
                  activeCategory === category.name ? 'text-primary' : ''
                }`}
              >
                <span className="material-icons text-sm">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
        <h2 className="font-space font-bold text-lg mb-3">Sources</h2>
        <ul className="space-y-2">
          {sources.map((source) => (
            <li key={source.id}>
              <button
                onClick={() => {}}  // This would filter by source
                className={`flex items-center space-x-2 p-2 w-full text-left rounded-lg font-medium hover:bg-light-hover dark:hover:bg-dark-hover ${
                  source.id === 'all' ? 'text-primary' : ''
                }`}
              >
                <span className="material-icons text-sm">{source.icon}</span>
                <span>{source.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
