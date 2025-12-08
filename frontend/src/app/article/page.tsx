import { MdArrowBack } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";

import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import formatDate from "@/utils/formatDate";
import useArticle from "@/hooks/api/useArticle";

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { article, isLoading, isError, error, refetch } = useArticle(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        <LoadingSpinner className="min-h-[60vh]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white pt-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <ErrorMessage
            message={error?.message ?? "Failed to load article"}
            onRetry={refetch}
          />
          <Link
            to="/"
            className="mt-4 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to articles
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Article not found.
          </p>
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            ← Back to articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen animate-fade-in bg-white dark:bg-zinc-900">
      <header className="border-b border-zinc-200 bg-white pt-16 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <MdArrowBack className="h-4 w-4" /> Back
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags &&
              article.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-800"
            />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {article.author.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {formatDate(article.publishedAt)} · {article.readingTime} min
                read
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="overflow-hidden rounded-xl shadow-lg dark:shadow-zinc-950/50">
            <img
              src={article.imageUrl}
              alt=""
              className="aspect-[2/1] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl px-6 py-12">
          {/* Markdown Content */}
          <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-h3:mt-8 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-zinc-700 prose-a:text-indigo-600 prose-pre:bg-zinc-900 prose-pre:text-zinc-300 dark:prose-p:text-zinc-300 dark:prose-pre:bg-zinc-800">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <footer className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <MdArrowBack className="h-4 w-4" /> All articles
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}

export default ArticlePage;
