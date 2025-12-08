import { Link } from "react-router-dom";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className={`group relative block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 dark:bg-zinc-800/50 dark:ring-zinc-700/50 dark:hover:shadow-zinc-900/50 ${
        featured ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={article.imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        {/* Tags on image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {article?.tags &&
            article?.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-zinc-800"
            />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {article.author.name}
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
            <span>{formatDate(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readingTime} min</span>
          </div>
        </div>
      </div>

      {/* Hover arrow indicator */}
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 dark:bg-zinc-800/90">
        <svg
          className="h-4 w-4 text-zinc-600 dark:text-zinc-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7v10"
          />
        </svg>
      </div>
    </Link>
  );
}

export default ArticleCard;
