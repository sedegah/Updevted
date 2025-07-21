// Articles
export interface Author {
  name: string;
  imageUrl: string;
}

export interface Tag {
  name: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  author: Author;
  source: string;
  readTime: number;
  tags: Tag[];
  category: string;
  bookmarked: boolean;
  readInApp?: boolean; // Flag to indicate if article can be read in-app
}

// GitHub Repositories
export interface RepoContributor {
  username: string;
  avatar: string;
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  currentPeriodStars: number;
  builtBy: RepoContributor[];
  bookmarked: boolean;
}

// Career Roadmaps
export interface Resource {
  name: string;
  url: string;
}

export interface RoadmapTopic {
  name: string;
  status: 'completed' | 'learning' | 'not-started';
  resources: Resource[];
}

export interface RoadmapSalary {
  entry: number;
  mid: number;
  senior: number;
}

export interface RoadmapCareer {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: RoadmapTopic[];
  salary: RoadmapSalary;
  companies: string[];
  interviewTopics: string[];
}

// Job Listings
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  url: string;
}

// API Status
export interface ApiStatus {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
