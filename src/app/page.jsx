import { HeroSection } from "@/components/sections";
import { heroContent } from "@/data/sections/hero";

export default function Home() {
  return (
    <main className="flex-fill d-flex flex-column min-vh-0">
      <HeroSection {...heroContent} />
    </main>
  );
}
