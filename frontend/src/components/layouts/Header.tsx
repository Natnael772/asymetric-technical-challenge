import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaGithub } from "react-icons/fa";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
            A
          </div>
          <span
            className={`text-lg font-semibold tracking-tight ${
              isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
            }`}
          >
            asymetric
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={`hidden rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:block ${
              isScrolled
                ? "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                : "text-white/80 hover:text-white"
            }`}
          >
            Articles
          </NavLink>

          <button
            onClick={toggleDarkMode}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isScrolled
                ? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <FaMoon className="h-5 w-5" />
            ) : (
              <FaSun className="h-5 w-5" />
            )}
          </button>

          <a
            href="https://github.com/Natnael772/asymetric-technical-challenge"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isScrolled
                ? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            aria-label="View on GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
