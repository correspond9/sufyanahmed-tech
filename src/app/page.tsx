import { HeroSection } from "@/components/hero";
import {
  AboutSection,
  BottomGridSection,
  ProjectsSection,
  ServicesSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <BottomGridSection />
    </>
  );
}
