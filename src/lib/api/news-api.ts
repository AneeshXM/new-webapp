/**
 * News API Service using GNews.io (FREE - No credit card required!)
 * Sign up at: https://gnews.io/
 * Free tier: 100 requests/day
 * 
 * This service falls back to mock data if no API key is provided.
 */

import type { NewsArticle, NewsFilters, NewsResponse } from '@/types';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

// GNews API types
export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

// Currents API types
export interface CurrentsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string | null;
  source: string;
  image: string | null;
  url: string;
  published_at: string;
  category: string[];
}

export interface CurrentsResponse {
  news: CurrentsArticle[];
  nextPage: string | null;
}

// NewsData.io types
export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_name: string;
  source_icon: string;
  category: string[];
}

export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
}

/**
 * Fetch from GNews API (PRIMARY - Free, no credit card)
 */
async function fetchFromGNews<T>(endpoint: string): Promise<T> {
  const url = endpoint.includes('?') 
    ? `${endpoint}&token=${GNEWS_API_KEY}` 
    : `${endpoint}?token=${GNEWS_API_KEY}`;
  
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`GNews error: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch from Currents API (SECONDARY - Free)
 */
async function fetchFromCurrents<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'apiKey': CURRENTS_API_KEY || '',
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Currents error: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch from NewsData.io (TERTIARY - Free)
 */
async function fetchFromNewsData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`NewsData error: ${response.status}`);
  }

  return response.json();
}

// Transform GNews article to our NewsArticle type
function transformGNewsArticle(article: GNewsArticle): NewsArticle {
  return {
    id: `gnews-${article.url}`,
    title: article.title,
    description: article.description,
    content: article.content,
    source: {
      name: article.source.name,
      url: article.source.url,
    },
    image: article.image || undefined,
    url: article.url,
    publishedAt: article.publishedAt,
    category: 'World Cup',
  };
}

// Transform Currents article to our NewsArticle type
function transformCurrentsArticle(article: CurrentsArticle): NewsArticle {
  return {
    id: `currents-${article.id}`,
    title: article.title,
    description: article.description || '',
    content: article.content || '',
    author: article.author || undefined,
    source: { name: article.source },
    image: article.image || undefined,
    url: article.url,
    publishedAt: article.published_at,
    category: article.category[0] || 'World Cup',
  };
}

// Transform NewsData article to our NewsArticle type
function transformNewsDataArticle(article: NewsDataArticle): NewsArticle {
  return {
    id: `newsdata-${article.article_id}`,
    title: article.title,
    description: article.description || '',
    content: article.content || '',
    source: { name: article.source_name },
    image: article.image_url || undefined,
    url: article.link,
    publishedAt: article.pubDate,
    category: article.category[0] || 'World Cup',
  };
}

// News API Service
export const newsApi = {
  /**
   * Search news with GNews (PRIMARY)
   */
  async searchNews(filters: NewsFilters = {}): Promise<NewsResponse> {
    const query = filters.query || 'FIFA World Cup 2026 football soccer';
    
    try {
      // Try GNews first
      if (GNEWS_API_KEY) {
        const from = filters.from || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const to = filters.to || new Date().toISOString().split('T')[0];
        const max = (filters.page ? filters.page * 10 : 10);
        
        const data = await fetchFromGNews<GNewsResponse>(
          `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${max}&from=${from}&to=${to}`
        );

        return {
          articles: data.articles.map(transformGNewsArticle),
          totalResults: data.totalArticles,
          pagination: {
            page: filters.page || 1,
            perPage: 10,
            total: data.totalArticles,
            totalPages: Math.ceil(data.totalArticles / 10),
          },
        };
      }
    } catch (error) {
      console.error('Failed to fetch news from GNews:', error);
    }

    // Try Currents API as fallback
    try {
      if (CURRENTS_API_KEY) {
        const data = await fetchFromCurrents<CurrentsResponse>(
          `https://api.currentsapi.services/v1/search/latest?query=${encodeURIComponent(query)}&language=en&apiKey=${CURRENTS_API_KEY}`
        );

        return {
          articles: data.news.map(transformCurrentsArticle),
          totalResults: data.news.length,
        };
      }
    } catch (error) {
      console.error('Failed to fetch news from Currents:', error);
    }

    // Try NewsData.io as fallback
    try {
      if (NEWSDATA_API_KEY) {
        const data = await fetchFromNewsData<NewsDataResponse>(
          `https://newsdata.io/api/1/news?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(query)}&language=en&category=sports`
        );

        return {
          articles: data.results.map(transformNewsDataArticle),
          totalResults: data.totalResults,
        };
      }
    } catch (error) {
      console.error('Failed to fetch news from NewsData:', error);
    }

    // Return mock data if all APIs fail
    console.log('All news APIs failed, using mock data');
    return this.getMockNews();
  },

  /**
   * Get top headlines
   */
  async getTopHeadlines(category = 'sports'): Promise<NewsResponse> {
    try {
      if (GNEWS_API_KEY) {
        const data = await fetchFromGNews<GNewsResponse>(
          `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=10&token=${GNEWS_API_KEY}`
        );

        return {
          articles: data.articles.map(transformGNewsArticle),
          totalResults: data.totalArticles,
        };
      }
    } catch (error) {
      console.error('Failed to fetch headlines from GNews:', error);
    }

    return this.getMockNews();
  },

  /**
   * Get mock news for demo
   */
  getMockNews(): NewsResponse {
    const mockArticles: NewsArticle[] = [
      {
        id: 'mock-1',
        title: 'World Cup 2026: Host Cities Ready to Welcome the World',
        description: 'The three host nations - USA, Canada, and Mexico - are preparing state-of-the-art stadiums and facilities for the biggest sporting event on Earth.',
        content: 'With the FIFA World Cup 2026 just around the corner, the three host nations are leaving no stone unturned in their preparations. From state-of-the-art stadiums to improved transportation infrastructure, North America is ready to welcome football fans from around the globe.',
        author: 'John Smith',
        source: { name: 'Sports Daily' },
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        url: '#',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'World Cup',
      },
      {
        id: 'mock-2',
        title: 'Argentina Aims to Defend Their World Cup Crown',
        description: 'Lionel Messi and the defending champions are focused on making history once again as they prepare for the tournament.',
        content: 'Argentina, fresh from their Copa America triumph, are setting their sights on becoming the first team to win three consecutive major international tournaments.',
        author: 'Maria Garcia',
        source: { name: 'Football Weekly' },
        image: 'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?w=800',
        url: '#',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        category: 'Teams',
      },
      {
        id: 'mock-3',
        title: 'France vs Brazil: The Ultimate World Cup Showdown',
        description: 'Two football giants are set to face off in what many are calling the most anticipated match of the tournament.',
        content: 'When France and Brazil meet on the pitch, magic is almost guaranteed. Both teams boast incredible talent and tactical flexibility.',
        author: 'David Johnson',
        source: { name: 'Global Sports News' },
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
        url: '#',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        category: 'Match Preview',
      },
      {
        id: 'mock-4',
        title: 'World Cup 2026 Format: Everything You Need to Know',
        description: 'FIFA has introduced a new format for the expanded 48-team tournament. Here is what changes and what stays the same.',
        content: 'The 2026 World Cup will feature 48 teams for the first time, up from 32. This expansion brings exciting new possibilities and challenges.',
        author: 'Sarah Williams',
        source: { name: 'FIFA Official' },
        image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
        url: '#',
        publishedAt: new Date(Date.now() - 28800000).toISOString(),
        category: 'Analysis',
      },
      {
        id: 'mock-5',
        title: 'Rising Stars to Watch at World Cup 2026',
        description: 'From Haaland to Bellingham, these young talents are ready to announce themselves on the biggest stage.',
        content: 'The next generation of football superstars is ready to shine. We identify the players who could become household names after this tournament.',
        author: 'Michael Brown',
        source: { name: 'Talent Scout' },
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
        url: '#',
        publishedAt: new Date(Date.now() - 43200000).toISOString(),
        category: 'Features',
      },
      {
        id: 'mock-6',
        title: 'VAR Technology: Four Years Later',
        description: 'How has video assistant referee technology evolved since its World Cup debut and what improvements can we expect?',
        content: 'VAR has been controversial but also transformative. We look at how the technology has improved and what new innovations are coming.',
        author: 'James Wilson',
        source: { name: 'Tech in Sports' },
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
        url: '#',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        category: 'Technology',
      },
    ];

    return {
      articles: mockArticles,
      pagination: {
        page: 1,
        perPage: 10,
        total: mockArticles.length,
        totalPages: 1,
      },
    };
  },
};

export default newsApi;
