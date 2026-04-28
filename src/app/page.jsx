import { HeroSection } from "@/components/sections";
import { heroContent } from "@/data/sections/hero";
import ServicesSection from "@/components/home/ServicesSection";
import WhyIeltsSection from "@/components/home/WhyIeltsSection";
import FaqSection from "@/components/home/FaqSection";
import LocationSection from "@/components/home/LocationSection";
import styles from "@/styles/home/home.module.css";

export default function Home() {
  return (
    <main className="flex-fill d-flex flex-column min-vh-0">
      <div className={styles.redLayer}>
        <HeroSection {...heroContent} />
        <ServicesSection />
      </div>
      <WhyIeltsSection />
      <FaqSection />
      <LocationSection />
    </main>
  );
}
