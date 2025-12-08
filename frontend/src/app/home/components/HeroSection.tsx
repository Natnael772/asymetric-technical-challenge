import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroSubheading from "./HeroSubheading";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

interface HeroSectionProps {
  totalArticles: number;
  hoursOfContent: number;
}

export default function HeroSection({
  totalArticles,
  hoursOfContent,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 dark:from-black dark:via-zinc-950 dark:to-black">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />
      </div>

      {/* Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23fff' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 text-center">
        <HeroBadge />
        <HeroHeading />
        <HeroSubheading />
        <HeroButtons />
        <HeroStats
          totalArticles={totalArticles}
          hoursOfContent={hoursOfContent}
        />
      </div>
    </section>
  );
}
