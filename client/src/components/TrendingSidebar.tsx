import { useState, useEffect } from "react";
import { Link } from "wouter";
import { GitHubRepo } from "@/types";
import { fetchGitHubTrendingRepos } from "@/lib/api";
import { formatNumber } from "@/lib/utils";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingSidebar() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  
  useEffect(() => {
    const loadTrendingRepos = async () => {
      try {
        const data = await fetchGitHubTrendingRepos();
        // Limit to top 3 for sidebar
        setRepos(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load trending repos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTrendingRepos();
  }, []);
  
  const toggleBookmark = (e: React.MouseEvent, repo: GitHubRepo) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isBookmarked(repo.id, "repo")) {
      removeBookmark(repo.id, "repo");
    } else {
      addBookmark(repo, "repo");
    }
  };
  
  // Popular tags for the sidebar
  const trendingTags = [
    "React", "TypeScript", "Docker", "AI", "Kubernetes", 
    "Python", "Web3", "Flutter"
  ];
  
  // Career paths for sidebar
  const careerPaths = [
    { id: "frontend-developer", name: "Frontend Developer" },
    { id: "backend-developer", name: "Backend Developer" },
    { id: "devops-engineer", name: "DevOps Engineer" },
    { id: "data-scientist", name: "Data Scientist" }
  ];
  
  return (
    <div className="hidden md:block w-72 space-y-6">
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
        <h2 className="font-space font-bold text-lg mb-3">GitHub Trends</h2>
        
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-800 py-3 last:border-0">
                <div className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-2 mt-1" />
                  <div className="w-full">
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <div className="flex items-center mt-2 space-x-4">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {repos.map((repo) => (
              <div key={repo.id} className="border-b border-gray-200 dark:border-gray-800 py-3 last:border-0">
                <div className="flex items-start">
                  <i className="material-icons text-gray-400 mr-2 mt-1">code</i>
                  <div>
                    <a 
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm hover:text-primary dark:hover:text-primary text-left cursor-pointer"
                    >
                      {repo.name}
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{repo.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <i className="material-icons text-xs mr-1">star</i>
                        <span>{formatNumber(repo.stars)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <i className="material-icons text-xs mr-1">fork_right</i>
                        <span>{formatNumber(repo.forks)}</span>
                      </div>
                      {repo.language && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${repo.languageColor}20`,
                            color: repo.languageColor
                          }}
                        >
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        
        <div className="mt-2">
          <Link href="/github-trends" className="text-primary text-sm font-medium flex items-center hover:underline">
            <span>View all trending repos</span>
            <i className="material-icons text-sm ml-1">arrow_forward</i>
          </Link>
        </div>
      </div>
      
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
        <h2 className="font-space font-bold text-lg mb-3">Trending Tags</h2>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <button 
              key={tag}
              className="text-sm bg-light-bg dark:bg-dark-hover px-3 py-1 rounded-full hover:bg-light-hover dark:hover:bg-opacity-80"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-sm">
        <h2 className="font-space font-bold text-lg mb-3">Career Roadmaps</h2>
        <ul className="space-y-2.5">
          {careerPaths.map((path) => (
            <li key={path.id}>
              <Link href={`/career-roadmaps/${path.id}`} className="flex items-center space-x-2 text-sm hover:text-primary">
                <i className="material-icons text-xs">route</i>
                <span>{path.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/career-roadmaps" className="flex items-center space-x-2 text-sm text-primary font-medium">
              <i className="material-icons text-xs">add_circle</i>
              <span>View all career paths</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
