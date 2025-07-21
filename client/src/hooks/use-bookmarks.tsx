import { useState, useEffect } from "react";
import { Article, GitHubRepo } from "@/types";

type BookmarkType = "article" | "repo";

interface BookmarkItem {
  id: string;
  type: BookmarkType;
  data: Article | GitHubRepo;
  timestamp: number;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  
  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("updevted-bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to parse bookmarks:", e);
        // If parsing fails, initialize with empty array
        setBookmarks([]);
      }
    }
  }, []);
  
  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("updevted-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Add a bookmark
  const addBookmark = (item: Article | GitHubRepo, type: BookmarkType) => {
    setBookmarks(prev => {
      // Check if already bookmarked
      const exists = prev.some(b => b.id === item.id && b.type === type);
      if (exists) return prev;
      
      return [...prev, {
        id: item.id,
        type,
        data: item,
        timestamp: Date.now()
      }];
    });
  };
  
  // Remove a bookmark
  const removeBookmark = (id: string, type: BookmarkType) => {
    setBookmarks(prev => 
      prev.filter(b => !(b.id === id && b.type === type))
    );
  };
  
  // Check if an item is bookmarked
  const isBookmarked = (id: string, type: BookmarkType): boolean => {
    return bookmarks.some(b => b.id === id && b.type === type);
  };
  
  // Get bookmarked articles
  const getBookmarkedArticles = (): Article[] => {
    return bookmarks
      .filter(b => b.type === "article")
      .map(b => b.data as Article);
  };
  
  // Get bookmarked repositories
  const getBookmarkedRepos = (): GitHubRepo[] => {
    return bookmarks
      .filter(b => b.type === "repo")
      .map(b => b.data as GitHubRepo);
  };
  
  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkedArticles,
    getBookmarkedRepos
  };
}
