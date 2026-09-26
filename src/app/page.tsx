import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryShowcase from "@/components/CategoryShowcase";
import PromoBanner from "@/components/PromoBanner";
import TrustSection from "@/components/TrustSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <CategoryShowcase />
      <PromoBanner />
      <TrustSection />
    </>
  );
}
