import FeaturedArticlesHeader from "./FeaturedArticlesHeader";
import FeaturedArticlesGrid from "./FeaturedArticlesGrid";
import { ArticleSkeletonGrid } from "@/components/ui/skeletons/ArticleSkeleton";
import ErrorMessage from "@/components/common/ErrorMessage";
import type { Article } from "@/types/article";

interface FeaturedArticlesSectionProps {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export default function FeaturedArticlesSection({
  articles,
  isLoading,
  isError,
  error,
  refetch,
}: FeaturedArticlesSectionProps) {
  return (
    <section id="articles" className="bg-zinc-50 py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6">
        <FeaturedArticlesHeader />

        {isLoading && <ArticleSkeletonGrid count={3} />}
        {isError && (
          <div className="max-w-md">
            <ErrorMessage
              message={error?.message ?? "Failed to load articles"}
              onRetry={refetch}
            />
          </div>
        )}
        {!isLoading && !isError && articles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-zinc-500 dark:text-zinc-500">
              No articles yet. Check back soon.
            </p>
          </div>
        )}
        {!isLoading && !isError && articles.length > 0 && (
          <FeaturedArticlesGrid articles={articles} />
        )}
      </div>
    </section>
  );
}
