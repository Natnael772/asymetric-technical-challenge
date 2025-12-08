/**
 * ArticleSkeleton - Loading placeholder for article cards
 */

export function ArticleSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Image placeholder */}
      <div className="aspect-video w-full bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />

      {/* Content placeholder */}
      <div className="p-5 space-y-4">
        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-5 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>

        {/* Author and meta */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}

export default ArticleSkeleton;
