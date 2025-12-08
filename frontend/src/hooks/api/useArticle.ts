/**
 * useArticle - Custom hook for fetching a single article by ID using React Query
 */

import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/article";
import { getArticleById } from "@/api/articles";

interface UseArticleResult {
  article: Article | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useArticle(id: string | undefined): UseArticleResult {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id!),
    enabled: !!id, // Only fetch when id is available
  });

  return {
    article: data ?? null,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}

export default useArticle;
