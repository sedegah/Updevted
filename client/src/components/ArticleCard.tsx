import { useState } from "react";
import { Article } from "@/types";
import { formatDate, truncateText, getSourceIcon } from "@/lib/utils";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import { useMobile } from "@/hooks/use-mobile";

interface ArticleCardProps {
  article: Article;
  isLoading?: boolean;
}

export default function ArticleCard({ article, isLoading = false }: ArticleCardProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const isMobile = useMobile();
  const [bookmarked, setBookmarked] = useState<boolean>(
    isBookmarked(article.id, "article")
  );
  
  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (bookmarked) {
      removeBookmark(article.id, "article");
      setBookmarked(false);
    } else {
      addBookmark(article, "article");
      setBookmarked(true);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-light-card dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Skeleton className="w-full h-40" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3 mb-3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-light-card dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
    >
      <div className="relative">
        <img 
          src={article.imageUrl} 
          alt={`${article.title} thumbnail`} 
          className="w-full h-32 sm:h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop";
          }}
        />
        <button 
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-black/60 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-black z-10"
          onClick={toggleBookmark}
          aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <span className="material-icons text-base">
            {bookmarked ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center text-xs text-white font-medium overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <img 
              src={article.author.imageUrl} 
              alt={`${article.author.name} avatar`} 
              className="w-5 h-5 rounded-full mr-2 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop";
              }}
            />
            <span className="flex items-center flex-shrink-0">
              <span className="material-icons text-xs mr-1">{getSourceIcon(article.source)}</span>
              {article.source}
            </span>
            <span className="mx-1 flex-shrink-0">•</span>
            <span className="flex-shrink-0">{article.readTime} min read</span>
            {article.readInApp && (
              <>
                <span className="mx-1 flex-shrink-0">•</span>
                <span className="flex items-center text-green-400 font-medium flex-shrink-0">
                  <span className="material-icons text-xs mr-1">article</span>
                  Read here
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-space font-bold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">
          {truncateText(article.description, isMobile ? 100 : 150)}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {article.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
              <Badge 
                key={tag.name} 
                variant="outline"
                className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-0 px-2 py-0.5 sm:py-1 rounded-full"
              >
                #{tag.name.toLowerCase().replace(/\s+/g, '')}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
