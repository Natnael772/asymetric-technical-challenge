/**
 * Article entity representing a blog post
 */
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  tags: string[];
  imageUrl: string;
  readingTime: number; // in minutes
}

export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

/**
 * API response types
 */
export interface ArticlesResponse {
  articles: Article[];
  total: number;
}

export interface ArticleResponse {
  article: Article;
}
