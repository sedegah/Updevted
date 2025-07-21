import { Article, GitHubRepo, RoadmapCareer, JobListing } from "@/types";
import { calculateReadTime, cleanHtmlContent } from "@/lib/utils";

// Helper function to determine the category for articles
function determineDevToCategory(tags: string[], title: string): string {
  const tagSet = new Set(tags.map(tag => tag.toLowerCase()));
  const titleLower = title.toLowerCase();
  const allContent = [...tags, title].join(' ').toLowerCase();

  // Web Development related tags and keywords
  const webDevTags = [
    'javascript', 'react', 'vue', 'angular', 'svelte', 'html', 'css', 'scss', 'sass', 'typescript', 
    'webdev', 'frontend', 'backend', 'node', 'nodejs', 'express', 'api', 'rest', 'graphql', 'apollo', 
    'fullstack', 'web development', 'web design', 'webassembly', 'wasm', 'pwa', 'webpack', 'vite', 
    'next.js', 'astro', 'remix', 'dom', 'jquery', 'php', 'laravel', 'symfony', 'django', 'flask', 
    'rails', 'ruby', 'netlify', 'vercel', 'jamstack', 'static site'
  ];
  
  if (webDevTags.some(tag => allContent.includes(tag))) {
    return 'Web Dev';
  }

  // AI & ML related tags and keywords
  const aiMlTags = [
    'ai', 'ml', 'machine learning', 'machinelearning', 'artificialintelligence', 'artificial intelligence',
    'deeplearning', 'deep learning', 'gpt', 'llm', 'large language model', 'nlp', 'natural language', 
    'datascience', 'data science', 'neural network', 'tensorflow', 'pytorch', 'huggingface', 'openai', 
    'anthropic', 'claude', 'chatgpt', 'llama', 'generative', 'computer vision', 'cv', 'transformer', 
    'bert', 'gpt-4', 'gpt-3', 'stable diffusion', 'diffusion', 'midjourney', 'dall-e', 'vectorization',
    'embeddings', 'semantic search', 'reinforcement learning', 'rag', 'retrieval augmented'
  ];
  
  if (aiMlTags.some(tag => allContent.includes(tag))) {
    return 'AI & ML';
  }

  // Mobile related tags and keywords
  const mobileTags = [
    'android', 'ios', 'swift', 'kotlin', 'flutter', 'reactnative', 'react native', 'mobiledev', 'mobile',
    'app development', 'xamarin', 'maui', 'ionic', 'capacitor', 'cordova', 'phoneGap', 'objective-c',
    'swiftui', 'jetpack compose', 'wear os', 'watchos', 'tvos', 'applewatch', 'iphone', 'ipad', 'tablet',
    'smartphone', 'appstore', 'play store', 'mobile app', 'pwa', 'progressive web app'
  ];
  
  if (mobileTags.some(tag => allContent.includes(tag))) {
    return 'Mobile';
  }

  // DevOps related tags and keywords
  const devOpsTags = [
    'devops', 'devsecops', 'docker', 'kubernetes', 'k8s', 'cicd', 'ci/cd', 'continuous integration', 
    'deployment', 'automation', 'jenkins', 'gitlab', 'github actions', 'circleci', 'travis', 'argocd', 
    'helm', 'terraform', 'ansible', 'puppet', 'chef', 'infrastructure as code', 'iac', 'monitoring', 
    'logging', 'alerting', 'sre', 'site reliability', 'prometheus', 'grafana', 'elk', 'observability',
    'container', 'containerd', 'podman', 'orchestration', 'gitops', 'version control', 'git'
  ];
  
  if (devOpsTags.some(tag => allContent.includes(tag))) {
    return 'DevOps';
  }

  // Cloud related tags and keywords
  const cloudTags = [
    'cloud', 'aws', 'amazon web services', 'azure', 'microsoft azure', 'gcp', 'google cloud', 'serverless',
    'microservices', 'lambda', 'faas', 'saas', 'paas', 'iaas', 'function as a service', 'platform as a service',
    'infrastructure as a service', 's3', 'ec2', 'rds', 'dynamodb', 'cosmos db', 'bigquery', 'firebase',
    'cloudflare', 'vercel', 'netlify', 'heroku', 'digital ocean', 'linode', 'virtual machine', 'vm',
    'containers', 'scalability', 'load balancing', 'cdn', 'edge computing', 'multi-cloud', 'hybrid cloud'
  ];
  
  if (cloudTags.some(tag => allContent.includes(tag))) {
    return 'Cloud';
  }

  // UI/UX related tags and keywords
  const uiUxTags = [
    'design', 'ui', 'ux', 'ui/ux', 'user interface', 'user experience', 'figma', 'sketch', 'adobe xd',
    'userexperience', 'userinterface', 'designsystem', 'design system', 'design thinking', 'wireframe',
    'prototype', 'mockup', 'usability', 'accessibility', 'a11y', 'wcag', 'responsive design', 'mobile first',
    'atomic design', 'typography', 'color theory', 'styleguide', 'style guide', 'information architecture',
    'interaction design', 'motion design', 'visual design', 'product design', 'user research', 'user testing'
  ];
  
  if (uiUxTags.some(tag => allContent.includes(tag))) {
    return 'UI/UX';
  }

  // Default to Web Dev for programming-related content
  const programmingRelatedTags = [
    'programming', 'coding', 'software', 'developer', 'development', 'engineer', 'github', 'open source',
    'code', 'tech', 'technology', 'algorithm', 'data structure', 'computer science', 'language'
  ];
  
  if (programmingRelatedTags.some(tag => allContent.includes(tag))) {
    return 'Web Dev';
  }

  // If still undetermined, use the first tag or fallback to Tech
  return tags[0] ? 'Web Dev' : 'Tech';
}

// Define error type
type ApiError = {
  message: string;
  status?: number;
};

// Dev.to API
export async function fetchDevToArticles(
  tag?: string,
  page: number = 1,
  perPage: number = 15
): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });
    
    if (tag) {
      params.append('tag', tag);
    }
    
    const response = await fetch(`https://dev.to/api/articles?${params.toString()}`);
    
    if (!response.ok) {
      throw { message: `Failed to fetch from Dev.to: ${response.statusText}`, status: response.status };
    }
    
    const data = await response.json();
    
    return data.map((article: any) => ({
      id: article.id.toString(),
      title: article.title,
      description: article.description || '',
      content: article.body_markdown || article.description || '',
      url: article.url,
      imageUrl: article.cover_image || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      publishedAt: article.published_at,
      author: {
        name: article.user.name,
        imageUrl: article.user.profile_image_90 || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop',
      },
      source: 'Dev.to',
      readTime: article.reading_time_minutes || calculateReadTime(article.body_markdown || article.description || ''),
      tags: article.tags.map((tag: string) => ({ name: tag })),
      category: determineDevToCategory(article.tags, article.title),
      bookmarked: false,
      readInApp: Boolean(article.body_markdown) // Dev.to articles with markdown content can be read in-app
    }));
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    throw error;
  }
}

// Hacker News API
export async function fetchHackerNewsArticles(
  page: number = 1,
  perPage: number = 15
): Promise<Article[]> {
  try {
    // Get top stories IDs
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    
    if (!response.ok) {
      throw { message: `Failed to fetch from Hacker News: ${response.statusText}`, status: response.status };
    }
    
    const storyIds = await response.json();
    
    // Calculate pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedIds = storyIds.slice(startIndex, endIndex);
    
    // Fetch each story details
    const storyPromises = paginatedIds.map((id: number) => 
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
    );
    
    const stories = await Promise.all(storyPromises);
    
    // Convert to our Article format
    return stories
      .filter((story: any) => story && story.title) // Filter out any null results
      .map((story: any) => {
        // Extract domain from URL for categorization
        let domain = '';
        let category = 'Tech';
        
        try {
          if (story.url) {
            const url = new URL(story.url);
            domain = url.hostname.replace('www.', '');
            
            // Enhanced categorization based on domain and story content
            const storyText = (story.text || '').toLowerCase();
            const storyTitle = story.title.toLowerCase();
            
            // Web Development
            if (domain.includes('github') || 
                domain.includes('web') || 
                domain.includes('javascript') || 
                domain.includes('react') || 
                domain.includes('vue') || 
                domain.includes('node') ||
                storyTitle.includes('web') ||
                storyTitle.includes('javascript') ||
                storyTitle.includes('frontend') ||
                storyTitle.includes('html') ||
                storyTitle.includes('css') ||
                storyTitle.includes('api') ||
                storyTitle.includes('typescript')) {
              category = 'Web Dev';
            } 
            // AI and Machine Learning
            else if (domain.includes('ai') || 
                    domain.includes('ml') || 
                    domain.includes('openai') || 
                    domain.includes('huggingface') ||
                    storyTitle.includes('ai') ||
                    storyTitle.includes('artificial intelligence') ||
                    storyTitle.includes('machine learning') ||
                    storyTitle.includes('gpt') ||
                    storyTitle.includes('llm') ||
                    storyTitle.includes('neural') ||
                    storyText.includes('ai') ||
                    storyText.includes('machine learning')) {
              category = 'AI & ML';
            } 
            // Cloud Computing
            else if (domain.includes('cloud') || 
                    domain.includes('aws') || 
                    domain.includes('azure') || 
                    domain.includes('gcp') ||
                    storyTitle.includes('cloud') ||
                    storyTitle.includes('aws') ||
                    storyTitle.includes('azure') ||
                    storyTitle.includes('serverless') ||
                    storyTitle.includes('microservice')) {
              category = 'Cloud';
            }
            // Mobile Development 
            else if (domain.includes('android') || 
                    domain.includes('ios') || 
                    domain.includes('apple') || 
                    domain.includes('mobile') ||
                    storyTitle.includes('android') ||
                    storyTitle.includes('ios') ||
                    storyTitle.includes('mobile') ||
                    storyTitle.includes('app store') ||
                    storyTitle.includes('iphone') ||
                    storyTitle.includes('flutter') ||
                    storyTitle.includes('react native')) {
              category = 'Mobile';
            }
            // DevOps
            else if (domain.includes('docker') || 
                    domain.includes('kubernetes') || 
                    domain.includes('devops') || 
                    domain.includes('gitlab') ||
                    storyTitle.includes('devops') ||
                    storyTitle.includes('docker') ||
                    storyTitle.includes('kubernetes') ||
                    storyTitle.includes('k8s') ||
                    storyTitle.includes('ci/cd') ||
                    storyTitle.includes('container') ||
                    storyTitle.includes('deployment')) {
              category = 'DevOps';
            }
            // UI/UX
            else if (domain.includes('design') || 
                    domain.includes('ui') || 
                    domain.includes('ux') || 
                    domain.includes('figma') ||
                    storyTitle.includes('design') ||
                    storyTitle.includes('ui') ||
                    storyTitle.includes('ux') ||
                    storyTitle.includes('interface') ||
                    storyTitle.includes('user experience') ||
                    storyTitle.includes('product design')) {
              category = 'UI/UX';
            }
          }
        } catch (e) {
          console.error('Error parsing URL:', e);
        }
        
        // Estimate read time based on text length and/or kids (comments)
        const contentLength = (story.text || '').length;
        const estimatedReadTime = Math.max(1, Math.ceil(contentLength / 1000) + Math.min(5, Math.floor((story.kids?.length || 0) / 10)));
        
        return {
          id: story.id.toString(),
          title: story.title,
          description: story.text || `Discussion on ${domain || 'Hacker News'}`,
          content: story.text || '',
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&h=400&fit=crop',
          publishedAt: new Date(story.time * 1000).toISOString(),
          author: {
            name: story.by || 'Anonymous',
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop',
          },
          source: 'Hacker News',
          readTime: estimatedReadTime,
          tags: [
            { name: domain || 'hackernews' },
            { name: category.toLowerCase().replace(' ', '') }
          ],
          category,
          bookmarked: false,
          readInApp: Boolean(story.text && story.text.length > 0) // Can be read in-app if story has text content
        };
      });
  } catch (error) {
    console.error('Error fetching Hacker News articles:', error);
    throw error;
  }
}

// Reddit API
export async function fetchRedditArticles(
  subreddit: string = 'programming',
  limit: number = 15
): Promise<Article[]> {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${limit}`);
    
    if (!response.ok) {
      throw { message: `Failed to fetch from Reddit: ${response.statusText}`, status: response.status };
    }
    
    const data = await response.json();
    const posts = data.data.children;
    
    return posts
      .filter((post: any) => !post.data.stickied && !post.data.is_video)
      .map((post: any) => {
        const postData = post.data;
        
        // Determine category based on flair or title keywords
        let category = 'Tech';
        const flairText = (postData.link_flair_text || '').toLowerCase();
        const title = postData.title.toLowerCase();
        const selftext = (postData.selftext || '').toLowerCase();
        
        // Web Development
        if (flairText.includes('web') || 
            title.includes('javascript') || title.includes('react') || title.includes('vue') || 
            title.includes('angular') || title.includes('frontend') || title.includes('css') || 
            title.includes('html') || title.includes('webpack') || title.includes('typescript') || 
            title.includes('api') || title.includes('restful') || title.includes('graphql')) {
          category = 'Web Dev';
        }
        // AI & ML
        else if (flairText.includes('ai') || flairText.includes('ml') || 
                title.includes('ai') || title.includes('artificial intelligence') || 
                title.includes('machine learning') || title.includes('tensorflow') || 
                title.includes('pytorch') || title.includes('gpt') || title.includes('llm') || 
                title.includes('deep learning') || title.includes('neural') || 
                title.includes('computer vision') || title.includes('nlp') || 
                selftext.includes('openai') || selftext.includes('machine learning')) {
          category = 'AI & ML';
        }
        // Mobile
        else if (flairText.includes('mobile') || title.includes('android') || 
                title.includes('ios') || title.includes('flutter') || 
                title.includes('react native') || title.includes('swift') || 
                title.includes('kotlin') || title.includes('mobile app') || 
                title.includes('app development') || title.includes('mobile developer')) {
          category = 'Mobile';
        }
        // DevOps
        else if (flairText.includes('devops') || title.includes('docker') || 
                title.includes('kubernetes') || title.includes('k8s') || 
                title.includes('ci/cd') || title.includes('jenkins') || 
                title.includes('ansible') || title.includes('terraform') || 
                title.includes('aws') || title.includes('cloud') || 
                title.includes('deployment') || title.includes('pipeline') || 
                title.includes('infrastructure')) {
          category = 'DevOps';
        }
        // Cloud
        else if (title.includes('cloud') || title.includes('aws') || 
                title.includes('azure') || title.includes('gcp') || 
                title.includes('serverless') || title.includes('lambda') || 
                title.includes('s3') || title.includes('ec2') || 
                title.includes('google cloud') || title.includes('microservices')) {
          category = 'Cloud';
        }
        // UI/UX
        else if (title.includes('design') || title.includes('ui') || title.includes('ux') || 
                title.includes('figma') || title.includes('user interface') || 
                title.includes('user experience') || title.includes('prototype') || 
                title.includes('wireframe') || title.includes('sketch')) {
          category = 'UI/UX';
        }
        
        // Get image URL or thumbnail if available
        let imageUrl = postData.url;
        if (postData.thumbnail && postData.thumbnail !== 'self' && postData.thumbnail !== 'default') {
          imageUrl = postData.thumbnail;
        } else if (postData.preview?.images?.[0]?.source?.url) {
          imageUrl = postData.preview.images[0].source.url.replace(/&amp;/g, '&');
        } else {
          imageUrl = 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=400&fit=crop';
        }
        
        // Extract tags from title and flair
        const tags = [
          { name: `r/${subreddit}` }
        ];
        
        if (flairText) {
          tags.push({ name: flairText });
        }
        
        // Calculate read time based on post length
        const textLength = (postData.selftext || '').length;
        const estimatedReadTime = Math.max(1, Math.ceil(textLength / 1500) + Math.min(4, Math.floor(postData.num_comments / 20)));
        
        return {
          id: postData.id,
          title: postData.title,
          description: postData.selftext ? postData.selftext.slice(0, 250) + (postData.selftext.length > 250 ? '...' : '') : '',
          content: postData.selftext || '',
          url: `https://www.reddit.com${postData.permalink}`,
          imageUrl,
          publishedAt: new Date(postData.created_utc * 1000).toISOString(),
          author: {
            name: postData.author,
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
          },
          source: 'Reddit',
          readTime: estimatedReadTime,
          tags,
          category,
          bookmarked: false,
          readInApp: Boolean(postData.selftext && postData.selftext.length > 100) // Reddit posts with substantial text can be read in-app
        };
      });
  } catch (error) {
    console.error('Error fetching Reddit articles:', error);
    throw error;
  }
}

// GitHub Trending API
export async function fetchGitHubTrendingRepos(
  language: string = '',
  since: string = 'daily' // daily, weekly, monthly
): Promise<GitHubRepo[]> {
  try {
    let url = 'https://github-trending-api.de.a9sapp.eu/repositories';
    
    if (language) {
      url += `?language=${encodeURIComponent(language)}`;
      if (since !== 'daily') {
        url += `&since=${since}`;
      }
    } else if (since !== 'daily') {
      url += `?since=${since}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      // If the external API fails, fall back to static data
      console.warn(`GitHub Trending API failed with status ${response.status}, using fallback data`);
      return getFallbackGitHubTrendingRepos();
    }
    
    const data = await response.json();
    
    return data.map((repo: any) => ({
      id: repo.author + '/' + repo.name,
      name: repo.author + '/' + repo.name,
      description: repo.description || '',
      url: repo.url || `https://github.com/${repo.author}/${repo.name}`,
      language: repo.language,
      languageColor: repo.languageColor || '#f1e05a',
      stars: repo.stars || 0,
      forks: repo.forks || 0,
      currentPeriodStars: repo.currentPeriodStars || 0,
      builtBy: repo.builtBy?.map((builder: any) => ({
        username: builder.username,
        avatar: builder.avatar
      })) || [],
      bookmarked: false
    }));
  } catch (error) {
    console.error('Error fetching GitHub trending repos:', error);
    // Return fallback data on error
    return getFallbackGitHubTrendingRepos();
  }
}

// Fallback GitHub trending repos data
function getFallbackGitHubTrendingRepos(): GitHubRepo[] {
  return [
    {
      id: 'facebook/react',
      name: 'facebook/react',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      url: 'https://github.com/facebook/react',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 210500,
      forks: 44200,
      currentPeriodStars: 234,
      builtBy: [
        {
          username: 'gaearon',
          avatar: 'https://avatars.githubusercontent.com/u/810438?v=4'
        }
      ],
      bookmarked: false
    },
    {
      id: 'microsoft/autogen',
      name: 'microsoft/autogen',
      description: 'Multi-agent conversation framework for LLM-based applications.',
      url: 'https://github.com/microsoft/autogen',
      language: 'Python',
      languageColor: '#3572A5',
      stars: 49800,
      forks: 6100,
      currentPeriodStars: 1023,
      builtBy: [
        {
          username: 'microsoft',
          avatar: 'https://avatars.githubusercontent.com/u/6154722?v=4'
        }
      ],
      bookmarked: false
    },
    {
      id: 'rust-lang/rust',
      name: 'rust-lang/rust',
      description: 'Empowering everyone to build reliable and efficient software.',
      url: 'https://github.com/rust-lang/rust',
      language: 'Rust',
      languageColor: '#dea584',
      stars: 88300,
      forks: 11700,
      currentPeriodStars: 432,
      builtBy: [
        {
          username: 'steveklabnik',
          avatar: 'https://avatars.githubusercontent.com/u/27786?v=4'
        }
      ],
      bookmarked: false
    },
    {
      id: 'denoland/deno',
      name: 'denoland/deno',
      description: 'A modern runtime for JavaScript and TypeScript.',
      url: 'https://github.com/denoland/deno',
      language: 'TypeScript',
      languageColor: '#2b7489',
      stars: 92400,
      forks: 5100,
      currentPeriodStars: 321,
      builtBy: [
        {
          username: 'ry',
          avatar: 'https://avatars.githubusercontent.com/u/80?v=4'
        }
      ],
      bookmarked: false
    },
    {
      id: 'vercel/next.js',
      name: 'vercel/next.js',
      description: 'The React Framework for the Web',
      url: 'https://github.com/vercel/next.js',
      language: 'TypeScript',
      languageColor: '#2b7489',
      stars: 111700,
      forks: 24900,
      currentPeriodStars: 567,
      builtBy: [
        {
          username: 'timneutkens',
          avatar: 'https://avatars.githubusercontent.com/u/6324199?v=4'
        }
      ],
      bookmarked: false
    }
  ];
}

// Fetch from all news sources
// NewsAPI for tech news
export async function fetchNewsApiArticles(
  page: number = 1,
  perPage: number = 10
): Promise<Article[]> {
  try {
    // Using a free API key - limited to 100 requests per day and developer mode
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=${perPage}&page=${page}&apiKey=66903772503b4b9c9b2b7f533638e8c7`);
    
    if (!response.ok) {
      throw { message: `Failed to fetch from News API: ${response.statusText}`, status: response.status };
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('News API Error:', data.message);
      return [];
    }
    
    return data.articles.map((article: any, index: number) => {
      // Extract keywords from title and description for categorization
      const title = article.title || '';
      const desc = article.description || '';
      const content = [title, desc].join(' ').toLowerCase();
      
      return {
        id: `news-${Date.now()}-${index}`,
        title: article.title,
        description: article.description || '',
        content: article.content || article.description || '',
        url: article.url,
        imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        publishedAt: article.publishedAt || new Date().toISOString(),
        author: {
          name: article.author || article.source?.name || 'Unknown',
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop',
        },
        source: 'News API',
        readTime: calculateReadTime(article.content || article.description || ''),
        tags: [
          { name: article.source?.name || 'tech' },
          { name: 'news' }
        ],
        category: determineDevToCategory(
          [article.source?.name || 'tech', article.title, article.description || ''],
          article.title
        ),
        bookmarked: false,
        readInApp: false
      };
    });
  } catch (error) {
    console.error('Error fetching News API articles:', error);
    return []; // Return empty array so other sources can still load
  }
}

// Stack Exchange API for technical Q&As
export async function fetchStackExchangeArticles(
  page: number = 1,
  perPage: number = 10
): Promise<Article[]> {
  try {
    // Stack Exchange API for hot questions - no API key required for basic usage
    const response = await fetch(
      `https://api.stackexchange.com/2.3/questions?pagesize=${perPage}&page=${page}&order=desc&sort=hot&site=stackoverflow&filter=withbody`
    );
    
    if (!response.ok) {
      throw { message: `Failed to fetch from Stack Exchange: ${response.statusText}`, status: response.status };
    }
    
    const data = await response.json();
    
    return data.items.map((item: any) => {
      // Extract tags for categorization
      const tags = item.tags || [];
      
      return {
        id: `stack-${item.question_id}`,
        title: item.title,
        description: cleanHtmlContent(item.body_markdown || item.body || '').substring(0, 200) + '...',
        content: cleanHtmlContent(item.body_markdown || item.body || ''),
        url: item.link,
        imageUrl: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded',
        publishedAt: new Date(item.creation_date * 1000).toISOString(),
        author: {
          name: item.owner?.display_name || 'Stack Overflow User',
          imageUrl: item.owner?.profile_image || 'https://www.gravatar.com/avatar/0?d=identicon&s=50',
        },
        source: 'Stack Overflow',
        readTime: calculateReadTime(item.body_markdown || item.body || ''),
        tags: tags.map((tag: string) => ({ name: tag })),
        category: determineDevToCategory(tags, item.title),
        bookmarked: false,
        readInApp: true
      };
    });
  } catch (error) {
    console.error('Error fetching Stack Exchange articles:', error);
    return []; // Return empty array so other sources can still load
  }
}

// Medium API for trending tech articles
export async function fetchMediumArticles(
  page: number = 1,
  perPage: number = 10
): Promise<Article[]> {
  try {
    // Using a CORS proxy to access Medium's RSS feed
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/topic/technology`);
    
    if (!response.ok) {
      throw { message: `Failed to fetch from Medium: ${response.statusText}`, status: response.status };
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok' || !data.items) {
      return [];
    }
    
    // Implement pagination manually since RSS feed doesn't have it
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedItems = data.items.slice(startIndex, endIndex);
    
    return paginatedItems.map((item: any, index: number) => {
      // Extract categories for categorization
      const categories = item.categories || [];
      
      return {
        id: `medium-${Date.now()}-${index}`,
        title: item.title,
        description: cleanHtmlContent(item.description).substring(0, 200) + '...',
        content: cleanHtmlContent(item.content),
        url: item.link,
        imageUrl: item.thumbnail || 'https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png',
        publishedAt: item.pubDate,
        author: {
          name: item.author,
          imageUrl: 'https://miro.medium.com/fit/c/96/96/1*6_fgYnisCa9V21mymySIvA.png',
        },
        source: 'Medium',
        readTime: calculateReadTime(item.content || ''),
        tags: categories.map((cat: string) => ({ name: cat })),
        category: determineDevToCategory(categories, item.title),
        bookmarked: false,
        readInApp: true
      };
    });
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return []; // Return empty array so other sources can still load
  }
}

// Quora-like content through RapidAPI Quora Scraper
export async function fetchQuoraLikeArticles(
  page: number = 1,
  perPage: number = 5
): Promise<Article[]> {
  try {
    // Using the public Quora Space feed which doesn't require API key
    const topics = ['programming', 'technology', 'artificial-intelligence', 'web-development', 'data-science'];
    const topic = topics[Math.floor(Math.random() * topics.length)]; // Randomly pick a topic
    
    // Fetch recent questions from a tech topic
    const response = await fetch(`https://www.quora.com/${topic}`);
    
    if (!response.ok) {
      // If direct fetch fails, we'll generate some Quora-like content based on other APIs
      // This emulates Quora Q&A style using tech topics
      const techTopics = [
        'javascript frameworks', 'learning to code', 'becoming a developer', 
        'artificial intelligence for beginners', 'cloud computing careers',
        'best programming languages', 'front-end vs back-end', 'mobile app development',
        'machine learning vs deep learning', 'web3 development', 'kubernetes vs docker'
      ];
      
      return Array(perPage).fill(0).map((_, index) => {
        const randomTopic = techTopics[Math.floor(Math.random() * techTopics.length)];
        
        return {
          id: `quora-like-${Date.now()}-${index}`,
          title: `What are the best ways to learn ${randomTopic} in 2023?`,
          description: `Community answers about ${randomTopic} from tech experts and experienced developers.`,
          content: `This is a collection of answers about ${randomTopic} from various developers and tech experts.`,
          url: `https://www.quora.com/topic/${randomTopic.replace(/\s+/g, '-')}`,
          imageUrl: 'https://qph.cf2.quoracdn.net/main-qimg-dc1a3a8a5bd0eef1d7b8e30c3ad8ad6c',
          publishedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(), // Random date within last week
          author: {
            name: 'Quora Community',
            imageUrl: 'https://qph.cf2.quoracdn.net/main-thumb-ti-1733435-100-glzcmgmgfrhktredorbrnsiuoklihjui.jpeg',
          },
          source: 'Quora-like',
          readTime: 5 + Math.floor(Math.random() * 10), // 5-15 min read
          tags: [{ name: randomTopic.split(' ')[0] }, { name: 'quora' }],
          category: determineDevToCategory([randomTopic], randomTopic),
          bookmarked: false,
          readInApp: false
        };
      });
    }
    
    // If we get here, we managed to fetch from Quora (unlikely due to their robots.txt)
    // In a production app, we would use their API or a specialized scraper service
    return [];
  } catch (error) {
    console.error('Error with Quora-like content:', error);
    return []; // Return empty array so other sources can still load
  }
}

export async function fetchAllArticles(
  category?: string,
  tag?: string,
  limit: number = 60
): Promise<Article[]> {
  try {
    const sourcesCount = 6; // Total number of article sources
    const perSourceLimit = Math.floor(limit / sourcesCount);
    
    // Prepare all source promises
    const devToPromise = fetchDevToArticles(tag, 1, perSourceLimit);
    const hackerNewsPromise = fetchHackerNewsArticles(1, perSourceLimit);
    const redditPromise = fetchRedditArticles('programming', perSourceLimit);
    const newsApiPromise = fetchNewsApiArticles(1, perSourceLimit);
    const stackExchangePromise = fetchStackExchangeArticles(1, perSourceLimit);
    const mediumPromise = fetchMediumArticles(1, perSourceLimit);
    const quoraPromise = fetchQuoraLikeArticles(1, Math.floor(perSourceLimit / 2)); // Fewer Quora items
    
    // Execute all promises with error handling
    const [
      devToArticles, 
      hackerNewsArticles, 
      redditArticles,
      newsApiArticles,
      stackExchangeArticles,
      mediumArticles,
      quoraArticles
    ] = await Promise.all([
      devToPromise.catch(error => {
        console.error('Failed to fetch DevTo articles:', error);
        return [];
      }),
      hackerNewsPromise.catch(error => {
        console.error('Failed to fetch HackerNews articles:', error);
        return [];
      }),
      redditPromise.catch(error => {
        console.error('Failed to fetch Reddit articles:', error);
        return [];
      }),
      newsApiPromise.catch(error => {
        console.error('Failed to fetch News API articles:', error);
        return [];
      }),
      stackExchangePromise.catch(error => {
        console.error('Failed to fetch Stack Exchange articles:', error);
        return [];
      }),
      mediumPromise.catch(error => {
        console.error('Failed to fetch Medium articles:', error);
        return [];
      }),
      quoraPromise.catch(error => {
        console.error('Failed to fetch Quora-like articles:', error);
        return [];
      })
    ]);
    
    let allArticles = [
      ...devToArticles, 
      ...hackerNewsArticles, 
      ...redditArticles,
      ...newsApiArticles,
      ...stackExchangeArticles,
      ...mediumArticles,
      ...quoraArticles
    ];
    
    // Sort by date (newest first)
    allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // Filter by category if provided
    if (category && category.toLowerCase() !== 'all tech') {
      const normalizedCategory = category.toLowerCase().replace(/\s+/g, '').replace('&', 'and');
      
      allArticles = allArticles.filter(article => {
        // Check if category matches (case-insensitive and normalized)
        const articleCategory = article.category.toLowerCase().replace(/\s+/g, '').replace('&', 'and');
        
        // Check if any tag matches (case-insensitive and normalized)
        const hasMatchingTag = article.tags.some(tag => {
          const normalizedTag = tag.name.toLowerCase().replace(/\s+/g, '').replace('&', 'and');
          return normalizedTag.includes(normalizedCategory) || normalizedCategory.includes(normalizedTag);
        });
        
        // Special case handling
        const specialCaseLookup = {
          'aiandml': ['ai', 'artificialintelligence', 'machinelearning', 'ml', 'gpt', 'llm', 'openai'],
          'devops': ['docker', 'kubernetes', 'k8s', 'cicd', 'deployment', 'automation', 'pipeline'],
          'mobile': ['android', 'ios', 'flutter', 'reactnative', 'mobiledev', 'app'],
          'cloud': ['aws', 'azure', 'gcp', 'googlecloud', 'serverless', 'saas', 'paas'],
          'uiux': ['design', 'userexperience', 'userinterface', 'figma', 'sketch', 'wireframe']
        };
        
        // Check if category falls under a special case
        const matchesSpecialCase = Object.entries(specialCaseLookup).some(([key, keywords]) => {
          if (normalizedCategory === key) {
            // If user selected this category, check if article has any related keywords
            return keywords.some(keyword => 
              articleCategory.includes(keyword) || 
              article.title.toLowerCase().includes(keyword) ||
              article.tags.some(tag => tag.name.toLowerCase().includes(keyword))
            );
          }
          return false;
        });
        
        return articleCategory.includes(normalizedCategory) || 
               normalizedCategory.includes(articleCategory) || 
               hasMatchingTag || 
               matchesSpecialCase;
      });
    }
    
    return allArticles;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    throw error;
  }
}

// Career Roadmap API
export async function fetchCareerRoadmaps(): Promise<RoadmapCareer[]> {
  try {
    // In a real app this would fetch from an actual API
    return Promise.resolve([
      {
        id: 'frontend-developer',
        title: 'Frontend Developer',
        description: 'Build user interfaces and interactive web applications',
        icon: 'web',
        topics: [
          {
            name: 'HTML & CSS',
            status: 'not-started',
            resources: [
              { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web' },
              { name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' }
            ]
          },
          {
            name: 'JavaScript',
            status: 'not-started',
            resources: [
              { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
              { name: 'JavaScript.info', url: 'https://javascript.info/' }
            ]
          },
          {
            name: 'React',
            status: 'not-started',
            resources: [
              { name: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
              { name: 'React Tutorial', url: 'https://reactjs.org/tutorial/tutorial.html' }
            ]
          },
          {
            name: 'State Management',
            status: 'not-started',
            resources: [
              { name: 'Redux Documentation', url: 'https://redux.js.org/introduction/getting-started' },
              { name: 'Zustand', url: 'https://github.com/pmndrs/zustand' }
            ]
          },
          {
            name: 'Build Tools',
            status: 'not-started',
            resources: [
              { name: 'Webpack', url: 'https://webpack.js.org/concepts/' },
              { name: 'Vite', url: 'https://vitejs.dev/guide/' }
            ]
          }
        ],
        salary: {
          entry: 70000,
          mid: 100000,
          senior: 150000
        },
        companies: [
          'Google',
          'Facebook',
          'Amazon',
          'Microsoft',
          'Apple'
        ],
        interviewTopics: [
          'JavaScript fundamentals',
          'React hooks and components',
          'CSS layouts and responsive design',
          'Browser rendering and performance',
          'Web accessibility'
        ]
      },
      {
        id: 'backend-developer',
        title: 'Backend Developer',
        description: 'Build server-side applications, APIs, and database systems',
        icon: 'dns',
        topics: [
          {
            name: 'Server Languages',
            status: 'not-started',
            resources: [
              { name: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
              { name: 'Python Documentation', url: 'https://docs.python.org/3/' }
            ]
          },
          {
            name: 'Databases',
            status: 'not-started',
            resources: [
              { name: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' },
              { name: 'MongoDB University', url: 'https://university.mongodb.com/' }
            ]
          },
          {
            name: 'API Design',
            status: 'not-started',
            resources: [
              { name: 'REST API Tutorial', url: 'https://restfulapi.net/' },
              { name: 'GraphQL Documentation', url: 'https://graphql.org/learn/' }
            ]
          },
          {
            name: 'Authentication & Security',
            status: 'not-started',
            resources: [
              { name: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/' },
              { name: 'Auth0 Documentation', url: 'https://auth0.com/docs/' }
            ]
          },
          {
            name: 'Server Deployment',
            status: 'not-started',
            resources: [
              { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' },
              { name: 'Heroku Dev Center', url: 'https://devcenter.heroku.com/' }
            ]
          }
        ],
        salary: {
          entry: 75000,
          mid: 110000,
          senior: 160000
        },
        companies: [
          'Netflix',
          'Spotify',
          'Twitter',
          'LinkedIn',
          'Salesforce'
        ],
        interviewTopics: [
          'Data structures and algorithms',
          'Database design and optimization',
          'API design principles',
          'Authentication and authorization',
          'Scalability and performance'
        ]
      },
      {
        id: 'devops-engineer',
        title: 'DevOps Engineer',
        description: 'Manage infrastructure, CI/CD pipelines, and deployment processes',
        icon: 'settings_suggest',
        topics: [
          {
            name: 'Linux Administration',
            status: 'not-started',
            resources: [
              { name: 'Linux Journey', url: 'https://linuxjourney.com/' },
              { name: 'Linux Documentation Project', url: 'https://tldp.org/' }
            ]
          },
          {
            name: 'Containerization',
            status: 'not-started',
            resources: [
              { name: 'Docker Documentation', url: 'https://docs.docker.com/get-started/' },
              { name: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/' }
            ]
          },
          {
            name: 'CI/CD Pipelines',
            status: 'not-started',
            resources: [
              { name: 'GitHub Actions', url: 'https://docs.github.com/en/actions' },
              { name: 'Jenkins Documentation', url: 'https://www.jenkins.io/doc/' }
            ]
          },
          {
            name: 'Infrastructure as Code',
            status: 'not-started',
            resources: [
              { name: 'Terraform Documentation', url: 'https://www.terraform.io/docs' },
              { name: 'Ansible Documentation', url: 'https://docs.ansible.com/' }
            ]
          },
          {
            name: 'Monitoring & Observability',
            status: 'not-started',
            resources: [
              { name: 'Prometheus Documentation', url: 'https://prometheus.io/docs/introduction/overview/' },
              { name: 'Grafana Tutorials', url: 'https://grafana.com/tutorials/' }
            ]
          }
        ],
        salary: {
          entry: 85000,
          mid: 120000,
          senior: 170000
        },
        companies: [
          'AWS',
          'Microsoft Azure',
          'Google Cloud',
          'IBM',
          'HashiCorp'
        ],
        interviewTopics: [
          'Containerization and orchestration',
          'CI/CD pipeline design',
          'Infrastructure as code',
          'System monitoring and alerts',
          'Incident response and troubleshooting'
        ]
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        description: 'Analyze data, build machine learning models, and derive insights',
        icon: 'analytics',
        topics: [
          {
            name: 'Programming for Data Science',
            status: 'not-started',
            resources: [
              { name: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
              { name: 'R for Data Science', url: 'https://r4ds.had.co.nz/' }
            ]
          },
          {
            name: 'Statistics & Mathematics',
            status: 'not-started',
            resources: [
              { name: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
              { name: 'MIT Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' }
            ]
          },
          {
            name: 'Machine Learning',
            status: 'not-started',
            resources: [
              { name: 'Scikit-Learn Documentation', url: 'https://scikit-learn.org/stable/documentation.html' },
              { name: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
            ]
          },
          {
            name: 'Deep Learning',
            status: 'not-started',
            resources: [
              { name: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' },
              { name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' }
            ]
          },
          {
            name: 'Data Visualization',
            status: 'not-started',
            resources: [
              { name: 'Matplotlib Documentation', url: 'https://matplotlib.org/stable/contents.html' },
              { name: 'D3.js Documentation', url: 'https://d3js.org/' }
            ]
          }
        ],
        salary: {
          entry: 90000,
          mid: 130000,
          senior: 180000
        },
        companies: [
          'OpenAI',
          'Meta AI',
          'DeepMind',
          'IBM Watson',
          'Nvidia'
        ],
        interviewTopics: [
          'Statistical modeling and hypothesis testing',
          'Machine learning algorithms',
          'Data cleaning and preprocessing',
          'Experiment design',
          'Model evaluation metrics'
        ]
      },
      {
        id: 'mobile-developer',
        title: 'Mobile Developer',
        description: 'Build applications for iOS, Android, and cross-platform',
        icon: 'phone_iphone',
        topics: [
          {
            name: 'Mobile UI Design',
            status: 'not-started',
            resources: [
              { name: 'Material Design', url: 'https://material.io/design' },
              { name: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/' }
            ]
          },
          {
            name: 'iOS Development',
            status: 'not-started',
            resources: [
              { name: 'Swift Documentation', url: 'https://docs.swift.org/swift-book/' },
              { name: 'Apple Developer Documentation', url: 'https://developer.apple.com/documentation/' }
            ]
          },
          {
            name: 'Android Development',
            status: 'not-started',
            resources: [
              { name: 'Android Developers', url: 'https://developer.android.com/docs' },
              { name: 'Kotlin Documentation', url: 'https://kotlinlang.org/docs/home.html' }
            ]
          },
          {
            name: 'Cross-Platform Frameworks',
            status: 'not-started',
            resources: [
              { name: 'React Native Documentation', url: 'https://reactnative.dev/docs/getting-started' },
              { name: 'Flutter Documentation', url: 'https://flutter.dev/docs' }
            ]
          },
          {
            name: 'App Publishing & Distribution',
            status: 'not-started',
            resources: [
              { name: 'Google Play Console Help', url: 'https://support.google.com/googleplay/android-developer/' },
              { name: 'App Store Connect Help', url: 'https://help.apple.com/app-store-connect/' }
            ]
          }
        ],
        salary: {
          entry: 80000,
          mid: 115000,
          senior: 165000
        },
        companies: [
          'Apple',
          'Google',
          'Uber',
          'Airbnb',
          'Tinder'
        ],
        interviewTopics: [
          'Mobile UI implementation',
          'State management in mobile apps',
          'Performance optimization',
          'Offline capabilities',
          'Mobile testing strategies'
        ]
      },
      {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        description: 'Design user interfaces and experiences for digital products',
        icon: 'design_services',
        topics: [
          {
            name: 'UI Design Principles',
            status: 'not-started',
            resources: [
              { name: 'Refactoring UI', url: 'https://www.refactoringui.com/' },
              { name: 'Material Design', url: 'https://material.io/design' }
            ]
          },
          {
            name: 'UX Research',
            status: 'not-started',
            resources: [
              { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/articles/' },
              { name: 'UX Research Field Guide', url: 'https://www.userinterviews.com/ux-research-field-guide' }
            ]
          },
          {
            name: 'Prototyping Tools',
            status: 'not-started',
            resources: [
              { name: 'Figma Help Center', url: 'https://help.figma.com/' },
              { name: 'Adobe XD Tutorials', url: 'https://www.adobe.com/products/xd/learn/get-started.html' }
            ]
          },
          {
            name: 'Interaction Design',
            status: 'not-started',
            resources: [
              { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/literature' },
              { name: 'Laws of UX', url: 'https://lawsofux.com/' }
            ]
          },
          {
            name: 'Visual Design',
            status: 'not-started',
            resources: [
              { name: 'Design Systems', url: 'https://www.designsystems.com/' },
              { name: 'Canva Design School', url: 'https://www.canva.com/learn/' }
            ]
          }
        ],
        salary: {
          entry: 70000,
          mid: 100000,
          senior: 150000
        },
        companies: [
          'Airbnb',
          'Figma',
          'Adobe',
          'Apple',
          'Dropbox'
        ],
        interviewTopics: [
          'Design process methodology',
          'User research techniques',
          'Wireframing and prototyping',
          'Visual hierarchy and typography',
          'Design systems and component libraries'
        ]
      },
      {
        id: 'cloud-engineer',
        title: 'Cloud Engineer',
        description: 'Design, implement, and manage cloud infrastructure',
        icon: 'cloud',
        topics: [
          {
            name: 'Cloud Service Providers',
            status: 'not-started',
            resources: [
              { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' },
              { name: 'Azure Documentation', url: 'https://docs.microsoft.com/en-us/azure/' }
            ]
          },
          {
            name: 'Cloud Architecture',
            status: 'not-started',
            resources: [
              { name: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/' },
              { name: 'Azure Architecture Center', url: 'https://docs.microsoft.com/en-us/azure/architecture/' }
            ]
          },
          {
            name: 'Cloud Security',
            status: 'not-started',
            resources: [
              { name: 'Cloud Security Alliance', url: 'https://cloudsecurityalliance.org/research/guidance/' },
              { name: 'AWS Security Documentation', url: 'https://docs.aws.amazon.com/security/' }
            ]
          },
          {
            name: 'Serverless Computing',
            status: 'not-started',
            resources: [
              { name: 'AWS Lambda', url: 'https://docs.aws.amazon.com/lambda/' },
              { name: 'Azure Functions', url: 'https://docs.microsoft.com/en-us/azure/azure-functions/' }
            ]
          },
          {
            name: 'Cloud Networking',
            status: 'not-started',
            resources: [
              { name: 'AWS Networking', url: 'https://docs.aws.amazon.com/vpc/' },
              { name: 'GCP Networking', url: 'https://cloud.google.com/vpc/docs' }
            ]
          }
        ],
        salary: {
          entry: 85000,
          mid: 125000,
          senior: 175000
        },
        companies: [
          'AWS',
          'Microsoft Azure',
          'Google Cloud',
          'IBM Cloud',
          'Oracle Cloud'
        ],
        interviewTopics: [
          'Cloud architecture patterns',
          'Infrastructure as code',
          'Cost optimization strategies',
          'High availability design',
          'Cloud security best practices'
        ]
      },
      {
        id: 'ai-ml-engineer',
        title: 'AI/ML Engineer',
        description: 'Build and deploy machine learning and artificial intelligence systems',
        icon: 'psychology',
        topics: [
          {
            name: 'Mathematics for AI',
            status: 'not-started',
            resources: [
              { name: 'Khan Academy Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' },
              { name: 'Stanford CS229 Linear Algebra Review', url: 'http://cs229.stanford.edu/section/cs229-linalg.pdf' }
            ]
          },
          {
            name: 'Machine Learning',
            status: 'not-started',
            resources: [
              { name: 'Andrew Ng\'s Machine Learning Course', url: 'https://www.coursera.org/learn/machine-learning' },
              { name: 'Scikit-Learn Documentation', url: 'https://scikit-learn.org/stable/documentation.html' }
            ]
          },
          {
            name: 'Deep Learning',
            status: 'not-started',
            resources: [
              { name: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning' },
              { name: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' }
            ]
          },
          {
            name: 'Natural Language Processing',
            status: 'not-started',
            resources: [
              { name: 'Hugging Face Transformers', url: 'https://huggingface.co/docs/transformers/index' },
              { name: 'spaCy Documentation', url: 'https://spacy.io/usage' }
            ]
          },
          {
            name: 'MLOps',
            status: 'not-started',
            resources: [
              { name: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html' },
              { name: 'Kubeflow Documentation', url: 'https://www.kubeflow.org/docs/' }
            ]
          }
        ],
        salary: {
          entry: 100000,
          mid: 140000,
          senior: 200000
        },
        companies: [
          'OpenAI',
          'Google Brain',
          'DeepMind',
          'Meta AI',
          'Anthropic'
        ],
        interviewTopics: [
          'Machine learning algorithms',
          'Neural network architectures',
          'Model evaluation and validation',
          'Feature engineering',
          'Large language models'
        ]
      },
      {
        id: 'cybersecurity-analyst',
        title: 'Cybersecurity Analyst',
        description: 'Protect systems, networks, and data from cyber threats',
        icon: 'security',
        topics: [
          {
            name: 'Network Security',
            status: 'not-started',
            resources: [
              { name: 'CompTIA Network+ Certification', url: 'https://www.comptia.org/certifications/network' },
              { name: 'Cisco Networking Academy', url: 'https://www.netacad.com/' }
            ]
          },
          {
            name: 'Security Operations',
            status: 'not-started',
            resources: [
              { name: 'SANS Reading Room', url: 'https://www.sans.org/reading-room/' },
              { name: 'Splunk Documentation', url: 'https://docs.splunk.com/' }
            ]
          },
          {
            name: 'Penetration Testing',
            status: 'not-started',
            resources: [
              { name: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
              { name: 'Metasploit Documentation', url: 'https://docs.metasploit.com/' }
            ]
          },
          {
            name: 'Security Compliance',
            status: 'not-started',
            resources: [
              { name: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
              { name: 'ISO/IEC 27001', url: 'https://www.iso.org/isoiec-27001-information-security.html' }
            ]
          },
          {
            name: 'Incident Response',
            status: 'not-started',
            resources: [
              { name: 'SANS Incident Handler\'s Handbook', url: 'https://www.sans.org/white-papers/33901/' },
              { name: 'NIST Incident Handling Guide', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf' }
            ]
          }
        ],
        salary: {
          entry: 80000,
          mid: 115000,
          senior: 160000
        },
        companies: [
          'FireEye',
          'CrowdStrike',
          'Palo Alto Networks',
          'Cisco',
          'Microsoft'
        ],
        interviewTopics: [
          'Threat detection and analysis',
          'Network security protocols',
          'Security tools and frameworks',
          'Incident response procedures',
          'Compliance requirements'
        ]
      }
    ]);
  } catch (error) {
    console.error('Error fetching career roadmaps:', error);
    throw error;
  }
}

// Fetch job listings
export async function fetchJobListings(role: string): Promise<JobListing[]> {
  try {
    // In a real app, this would fetch from the Remotive API with the role as a parameter
    return Promise.resolve([
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'Airbnb',
        location: 'Remote',
        salary: '$120K - $150K',
        description: 'Join our team to build amazing user experiences using React and modern frontend technologies.',
        url: 'https://example.com/job/1'
      },
      {
        id: '2',
        title: 'Frontend Engineer',
        company: 'Stripe',
        location: 'San Francisco, CA',
        salary: '$130K - $160K',
        description: 'Help us build the next generation of payment interfaces using TypeScript and React.',
        url: 'https://example.com/job/2'
      },
      {
        id: '3',
        title: 'UI Developer',
        company: 'Netflix',
        location: 'Remote',
        salary: '$110K - $140K',
        description: 'Create engaging user interfaces for our streaming platform using modern web technologies.',
        url: 'https://example.com/job/3'
      }
    ]);
  } catch (error) {
    console.error('Error fetching job listings:', error);
    throw error;
  }
}
