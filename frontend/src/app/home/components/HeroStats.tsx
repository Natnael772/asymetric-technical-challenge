interface HeroStatsProps {
  totalArticles: number;
  hoursOfContent: number;
}

export default function HeroStats({
  totalArticles,
  hoursOfContent,
}: HeroStatsProps) {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-10 sm:gap-16">
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{totalArticles}+</div>
        <div className="mt-1 text-sm text-zinc-500">Articles</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{hoursOfContent}+</div>
        <div className="mt-1 text-sm text-zinc-500">Hours of Content</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">∞</div>
        <div className="mt-1 text-sm text-zinc-500">Ideas</div>
      </div>
    </div>
  );
}
