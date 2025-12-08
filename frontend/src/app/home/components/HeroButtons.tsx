import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <Link
        to="/articles"
        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100"
      >
        Browse all articles
        <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>

      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
      >
        <FaGithub className="h-4 w-4" />
        View source
      </a>
    </div>
  );
}
