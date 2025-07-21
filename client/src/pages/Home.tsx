import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllArticles } from "@/lib/api";
import { Article } from "@/types";
import CategorySidebar from "@/components/CategorySidebar";
import TrendingSidebar from "@/components/TrendingSidebar";
import ArticleCard from "@/components/ArticleCard";
import TabNavigation from "@/components/TabNavigation";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [activeCategory, setActiveCategory] = useState('All Tech');
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const isMobile = useMobile();
  
  // Fetch articles with auto-refresh every 5 minutes (300000ms)
  const { data: articles, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['articles', activeCategory],
    queryFn: () => fetchAllArticles(activeCategory === 'All Tech' ? undefined : activeCategory),
    refetchInterval: 300000, // 5 minutes in milliseconds
    staleTime: 240000, // 4 minutes in milliseconds
  });
  
  // Set up a visual indicator for refreshing data
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000); // Visual feedback for at least 1 second
  };
  
  useEffect(() => {
    if (articles) {
      let filtered = [...articles];
      
      // Apply sorting based on active tab
      if (activeTab === 'latest') {
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      } else if (activeTab === 'popular') {
        // For demonstrative purposes, we'll sort by readTime (in a real app, this would be by views/likes)
        filtered.sort((a, b) => b.readTime - a.readTime);
      }
      
      setDisplayedArticles(filtered.slice(0, page * 9));
    }
  }, [articles, activeTab, page]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  
  return (
    <main className="flex-grow container mx-auto px-4 py-6 flex flex-col md:flex-row md:space-x-6">
      {/* Mobile search & category navigation */}
      {isMobile && (
        <div className="md:hidden mb-4 space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search articles, topics..." 
              className="w-full rounded-full bg-light-bg dark:bg-dark-hover py-2 px-4 pl-10 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary text-sm"
            />
            <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide pb-2 space-x-2">
            {['All Tech', 'Web Dev', 'AI & ML', 'DevOps', 'Mobile', 'Cloud', 'UI/UX'].map((category) => {
              const icon = 
                category === 'All Tech' ? 'code' :
                category === 'Web Dev' ? 'web' :
                category === 'AI & ML' ? 'psychology' :
                category === 'DevOps' ? 'settings_suggest' :
                category === 'Mobile' ? 'phone_iphone' :
                category === 'Cloud' ? 'cloud' :
                'design_services';
                
              return (
                <button 
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-2 rounded-full font-medium text-sm whitespace-nowrap flex items-center ${
                    activeCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-light-bg dark:bg-dark-hover hover:bg-light-hover dark:hover:bg-dark-hover'
                  }`}
                  aria-label={category}
                >
                  <span className="material-icons text-sm mr-1.5">{icon}</span>
                  <span>{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Desktop Category Sidebar */}
      <CategorySidebar 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* Main Content */}
      <div className="flex-grow">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <ArticleCard key={index} article={{} as Article} isLoading={true} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-2">Error loading articles</p>
            <p className="text-sm text-gray-500">{(error as Error)?.message || 'Something went wrong'}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {displayedArticles.length < (articles?.length || 0) && (
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="outline"
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-light-hover dark:bg-dark-hover rounded-full font-medium text-sm hover:bg-gray-200 dark:hover:bg-dark-card"
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Trending Sidebar */}
      <TrendingSidebar />
    </main>
  );
}
