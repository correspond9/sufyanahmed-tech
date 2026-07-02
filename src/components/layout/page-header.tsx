import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GradientText, SectionLabel } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";
import { routes } from "@/lib/navigation";

interface PageHeaderProps {
  label?: string;
  title: string;
  description?: string;
  showBack?: boolean;
}

export function PageHeader({
  label,
  title,
  description,
  showBack = true,
}: PageHeaderProps) {
  return (
    <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16">
      <div
        className="section-glow-divider absolute inset-x-0 top-0"
        aria-hidden
      />
      <Container>
        {showBack && (
          <Reveal>
            <Link
              href={routes.home}
              className="text-primary/80 hover:text-primary mb-8 inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to Home
            </Link>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          {label && <SectionLabel className="mb-3">{label}</SectionLabel>}
          <h1 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <GradientText as="span">{title}</GradientText>
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/55">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
