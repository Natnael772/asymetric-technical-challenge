export interface UpdateArticleDto {
  title?: string;
  excerpt?: string;
  content?: string;
  htmlContent?: string;
  imageUrl?: string;
  readingTime?: number;
  publishedAt?: string;
}
