import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left - Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
            A
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            asymetric
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-500">
          <span>© 2024</span>
          <a
            href="https://github.com/Natnael772"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            Natnael Deyas
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
