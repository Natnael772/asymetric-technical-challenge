/**
 * Articles API - Endpoints for fetching blog articles
 */

import { fetchApi } from "./client";
import type { Article } from "@/types/article";

/**
 * Backend API response format
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Fetch all articles from the API with pagination
 */
export async function getArticles(
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; meta?: ApiResponse<Article>["meta"] }> {
  try {
    const response = await fetchApi<ApiResponse<Article[]>>(
      `/articles?page=${page}&limit=${limit}`
    );
    return { articles: response.data, meta: response.meta };
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch a single article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetchApi<ApiResponse<Article>>(`/articles/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  getArticles,
  getArticleById,
};
