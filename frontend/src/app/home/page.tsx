import { useArticles } from "@/hooks/api/useArticles";
import HeroSection from "./components/HeroSection";
import FeaturedArticlesSection from "./components/FeaturedArticlesSection";
import NewsletterSection from "./components/NewsletterSection";
const FEATURED_COUNT = 3;

export default function HomePage() {
  const { articles, meta, isLoading, isError, error, refetch } = useArticles();

  const featuredArticles = articles?.slice(0, FEATURED_COUNT) ?? [];

  const totalArticles = meta?.total ?? 0;
  const hoursOfContent = Math.max(1, Math.round((totalArticles * 5) / 60));

  return (
    <div className="animate-fade-in">
      <HeroSection
        totalArticles={totalArticles}
        hoursOfContent={hoursOfContent}
      />
      <FeaturedArticlesSection
        articles={featuredArticles}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
      <NewsletterSection />
    </div>
  );
}
