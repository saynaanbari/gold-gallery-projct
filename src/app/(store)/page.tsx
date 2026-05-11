import CategorySection from "@/components/store/home/components/category-section";
import HeroSection from "@/components/store/home/components/hero-section";
import InstagramFollow from "@/components/store/home/components/instagram-follow";
import LatestProducts from "@/components/store/home/components/latest-products";
import PopularProducts from "@/components/store/home/components/popular-products";
import WhyChooseUs from "@/components/store/home/components/why-choose-us";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <CategorySection/>
      <LatestProducts/>
      <PopularProducts/>
      <WhyChooseUs/>
      <InstagramFollow/>
    </div>
  );
}
