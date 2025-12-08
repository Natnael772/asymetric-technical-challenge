import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function FeaturedArticlesHeader() {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Latest Articles
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Fresh insights and practical guides
        </p>
      </div>
      <Link
        to="/articles"
        className="hidden items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 sm:flex"
      >
        View all
        <FaArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
