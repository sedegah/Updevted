import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubTrendingRepos } from "@/lib/api";
import { GitHubRepo } from "@/types";
import { formatNumber } from "@/lib/utils";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function GitHubTrends() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('daily');
  
  const { data: repos, isLoading, isError, error } = useQuery({
    queryKey: ['github-trending', selectedLanguage, selectedPeriod],
    queryFn: () => fetchGitHubTrendingRepos(selectedLanguage, selectedPeriod),
  });
  
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  
  const toggleBookmark = (repo: GitHubRepo) => {
    if (isBookmarked(repo.id, "repo")) {
      removeBookmark(repo.id, "repo");
    } else {
      addBookmark(repo, "repo");
    }
  };
  
  const languages = [
    { id: '', name: 'All Languages' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'c++', name: 'C++' },
    { id: 'php', name: 'PHP' }
  ];
  
  const periods = [
    { id: 'daily', name: 'Today' },
    { id: 'weekly', name: 'This Week' },
    { id: 'monthly', name: 'This Month' }
  ];
  
  return (
    <main className="flex-grow container mx-auto px-4 py-6">
      <h1 className="font-space text-2xl font-bold mb-6">GitHub Trending Repositories</h1>
      
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto">
            <h3 className="text-sm font-medium mb-2">Language</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedLanguage === language.id
                      ? 'bg-primary text-white'
                      : 'bg-light-bg dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto md:ml-auto">
            <h3 className="text-sm font-medium mb-2">Time Period</h3>
            <div className="flex gap-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedPeriod === period.id
                      ? 'bg-primary text-white'
                      : 'bg-light-bg dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array(10).fill(0).map((_, index) => (
            <div key={index} className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <Skeleton className="h-6 w-6 mr-3" />
                <div className="w-full">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Error loading repositories</p>
          <p className="text-sm text-gray-500">{(error as Error)?.message || 'Something went wrong'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {repos?.map((repo) => (
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
                      onClick={() => toggleBookmark(repo)}
                      className="p-1 flex-shrink-0"
                    >
                      <span className="material-icons">
                        {isBookmarked(repo.id, "repo") ? 'bookmark' : 'bookmark_border'}
                      </span>
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
                    {selectedPeriod !== 'daily' && (
                      <div className="flex items-center text-xs sm:text-sm text-green-600 dark:text-green-400">
                        <span className="material-icons text-xs sm:text-sm mr-1">trending_up</span>
                        <span className="whitespace-nowrap">+{formatNumber(repo.currentPeriodStars)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
