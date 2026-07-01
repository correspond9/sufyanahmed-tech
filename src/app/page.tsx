import { HeroSection } from "@/components/hero";
import {
  AboutSection,
  JourneySection,
  ProjectsSection,
  ProcessSection,
  TechStackSection,
  CertificationsSection,
  ContactSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <ProjectsSection />
      <ProcessSection />
      <TechStackSection />
      <CertificationsSection />
      <ContactSection />
    </>
  );
}
