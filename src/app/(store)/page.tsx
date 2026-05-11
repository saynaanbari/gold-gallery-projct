import CategorySection from "@/components/store/home/components/category-section";
import HeroSection from "@/components/store/home/components/hero-section";
import LatestProducts from "@/components/store/home/components/latest-products";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <CategorySection/>
      <LatestProducts/>
    </div>
  );
}
