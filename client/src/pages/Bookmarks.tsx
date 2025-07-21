import { useState } from "react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import ArticleCard from "@/components/ArticleCard";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Bookmarks() {
  const { getBookmarkedArticles, getBookmarkedRepos, removeBookmark } = useBookmarks();
  const [activeTab, setActiveTab] = useState<'articles' | 'repos'>('articles');
  
  const bookmarkedArticles = getBookmarkedArticles();
  const bookmarkedRepos = getBookmarkedRepos();
  
  const handleRemoveRepo = (repoId: string) => {
    removeBookmark(repoId, "repo");
  };
  
  return (
    <main className="flex-grow container mx-auto px-4 py-6 pb-20 md:pb-6">
      <h1 className="font-space text-2xl font-bold mb-6">Your Bookmarks</h1>
      
      <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <button
            className={`font-space ${
              activeTab === 'articles' 
                ? 'font-bold pb-3 px-4 border-b-2 border-primary text-primary' 
                : 'font-medium pb-3 px-4 text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('articles')}
          >
            Articles
          </button>
          <button
            className={`font-space ${
              activeTab === 'repos' 
                ? 'font-bold pb-3 px-4 border-b-2 border-primary text-primary' 
                : 'font-medium pb-3 px-4 text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('repos')}
          >
            GitHub Repos
          </button>
        </div>
      </div>
      
      {activeTab === 'articles' ? (
        <>
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-icons text-5xl text-gray-300 dark:text-gray-600 mb-4">bookmark_border</span>
              <h2 className="font-space text-xl font-medium mb-2">No bookmarked articles</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Articles you bookmark will appear here for easy access</p>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Browse articles
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedArticles.map((article) => (
                <ArticleCard key={article.id} article={{...article, bookmarked: true}} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {bookmarkedRepos.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-icons text-5xl text-gray-300 dark:text-gray-600 mb-4">bookmark_border</span>
              <h2 className="font-space text-xl font-medium mb-2">No bookmarked repositories</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">GitHub repositories you bookmark will appear here</p>
              <Button variant="outline" onClick={() => window.location.href = '/github-trends'}>
                Explore GitHub trends
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedRepos.map((repo) => (
                <div key={repo.id} className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
                  <div className="flex items-start">
                    <span className="material-icons text-gray-400 mr-3 hidden sm:block">code</span>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <a 
                          href={repo.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-space font-medium text-base hover:text-primary dark:hover:text-primary line-clamp-1 sm:line-clamp-none pr-2"
                        >
                          {repo.name}
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRepo(repo.id)}
                          className="p-1 flex-shrink-0"
                        >
                          <span className="material-icons">bookmark</span>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3 line-clamp-2 sm:line-clamp-none">
                        {repo.description}
                      </p>
                      <div className="flex items-center flex-wrap gap-2 sm:gap-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="material-icons text-sm mr-1">star</span>
                          <span>{formatNumber(repo.stars)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="material-icons text-sm mr-1">fork_right</span>
                          <span>{formatNumber(repo.forks)}</span>
                        </div>
                        {repo.language && (
                          <Badge 
                            className="font-normal text-xs sm:text-sm"
                            style={{
                              backgroundColor: `${repo.languageColor}20`,
                              color: repo.languageColor
                            }}
                          >
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
