import { Link } from "react-router-dom";
import { paths } from "@/paths";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white p-4 text-center dark:bg-zinc-900">
      <div className="max-w-md space-y-6">
        <h1 className="text-9xl font-black text-gray-200 dark:text-zinc-800">
          404
        </h1>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            to={paths.home}
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
