import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(words / wordsPerMinute);
  return readTimeMinutes < 1 ? 1 : readTimeMinutes;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function cleanHtmlContent(html: string): string {
  // Remove HTML tags
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function getRandomColor(tag: string): string {
  // Generate a consistent color for a specific tag
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    "blue", "green", "purple", "orange", "cyan", "pink", "indigo", "teal", "yellow", "red"
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

export function getSourceIcon(source: string): string {
  switch (source.toLowerCase()) {
    case 'dev.to':
      return 'description';
    case 'hacker news':
    case 'hackernews':
      return 'trending_up';
    case 'reddit':
      return 'forum';
    default:
      return 'public';
  }
}

export function getTagIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'web dev':
    case 'webdev':
      return 'web';
    case 'ai':
    case 'ml':
    case 'ai & ml':
      return 'psychology';
    case 'mobile':
      return 'phone_iphone';
    case 'devops':
      return 'settings_suggest';
    case 'cloud':
      return 'cloud';
    case 'ui/ux':
    case 'design':
      return 'design_services';
    default:
      return 'code';
  }
}
