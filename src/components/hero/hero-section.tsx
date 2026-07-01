import { Container } from "@/components/ui/container";
import { HeroAmbientBackground } from "@/components/hero/hero-ambient-background";
import { HeroCta } from "@/components/hero/hero-cta";
import { HeroEyebrow, HeroSubtitle } from "@/components/hero/hero-copy";
import { HeroHeadline } from "@/components/hero/hero-headline";
import { HeroScene } from "@/components/hero/hero-scene";
import { HeroScrollIndicator } from "@/components/hero/hero-scroll-indicator";
import { HeroTerminal } from "@/components/hero/hero-terminal";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <HeroAmbientBackground />

      <Container className="relative z-[1] h-full py-14 lg:py-20">
        <div className="grid h-full items-center gap-14 lg:grid-cols-2 lg:gap-10 xl:gap-20">
          <div className="flex flex-col justify-center space-y-7 lg:space-y-8">
            <HeroEyebrow />
            <div id="hero-heading" className="space-y-1">
              <HeroHeadline />
            </div>
            <HeroSubtitle />
            <HeroCta />
            <HeroTerminal className="mt-1 max-w-md" />
          </div>

          <div className="relative flex min-h-[380px] items-center justify-center sm:min-h-[440px] lg:min-h-[calc(100vh-9rem)]">
            <HeroScene className="absolute inset-0" />
          </div>
        </div>
      </Container>

      <HeroScrollIndicator />
    </section>
  );
}
