import { ArticleCard } from "@/components/core/ArticleCard";
import { ArticleSkeletonGrid } from "@/components/ui/skeletons/ArticleSkeleton";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useArticles } from "@/hooks/api/useArticles";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ARTICLES_PER_PAGE = 6;

export function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { articles, meta, isLoading, isError, error, refetch } = useArticles(
    currentPage,
    ARTICLES_PER_PAGE
  );

  const totalPages = meta?.totalPages ?? 0;
  const totalArticles = meta?.total ?? 0;
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-16 dark:bg-zinc-900">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            All Articles
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {isLoading ? (
              <span className="inline-block h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              `Browse all ${totalArticles} articles`
            )}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Loading State - Skeleton Grid */}
        {isLoading && <ArticleSkeletonGrid count={6} />}

        {/* Error State */}
        {isError && (
          <div className="max-w-md">
            <ErrorMessage
              message={error?.message ?? "Failed to load articles"}
              onRetry={refetch}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && articles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-zinc-500 dark:text-zinc-500">
              No articles yet. Check back soon.
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!isLoading && !isError && articles.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Previous */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  <FaArrowLeft className="h-4 w-4" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                          : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  <FaArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Page Info */}
            <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-500">
              Showing {startIndex + 1}-
              {Math.min(startIndex + ARTICLES_PER_PAGE, totalArticles)} of{" "}
              {totalArticles} articles
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ArticlesPage;
