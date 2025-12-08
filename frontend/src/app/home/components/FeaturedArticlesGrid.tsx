import { ArticleCard } from "@/components/core/ArticleCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import type { Article } from "@/types/article";

interface FeaturedArticlesGridProps {
  articles: Article[];
}

export default function FeaturedArticlesGrid({
  articles,
}: FeaturedArticlesGridProps) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            featured={index === 0}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center sm:hidden">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          View all articles
          <FaArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
