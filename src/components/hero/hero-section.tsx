import { Container } from "@/components/ui/container";
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
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container className="relative h-full py-12 lg:py-16">
        <div className="grid h-full items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <HeroEyebrow />
            <div id="hero-heading">
              <HeroHeadline />
            </div>
            <HeroSubtitle />
            <HeroCta />
            <HeroTerminal className="mt-2 max-w-md" />
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[420px] lg:min-h-[calc(100vh-8rem)]">
            <HeroScene className="absolute inset-0" />
          </div>
        </div>
      </Container>

      <HeroScrollIndicator />
    </section>
  );
}
