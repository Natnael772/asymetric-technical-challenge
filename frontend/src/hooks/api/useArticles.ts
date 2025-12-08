/**
 * useArticles - Custom hook for fetching articles list using React Query
 */

import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/article";
import { getArticles } from "@/api/articles";

interface UseArticlesResult {
  articles: Article[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useArticles(page: number = 1, limit: number = 6): UseArticlesResult {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["articles", page, limit],
    queryFn: () => getArticles(page, limit),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new page
  });

  return {
    articles: data?.articles ?? [],
    meta: data?.meta,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}

export default useArticles;
