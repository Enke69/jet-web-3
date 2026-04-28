import { HeroSection } from "@/components/sections";
import { heroContent } from "@/data/sections/hero";
import ServicesSection from "@/components/home/ServicesSection";
import WhyIeltsSection from "@/components/home/WhyIeltsSection";
import FaqSection from "@/components/home/FaqSection";
import LocationSection from "@/components/home/LocationSection";

export default function Home() {
  return (
    <main className="flex-fill d-flex flex-column min-vh-0">
      <HeroSection {...heroContent} />
      <ServicesSection />
      <WhyIeltsSection />
      <FaqSection />
      <LocationSection />
    </main>
  );
}
