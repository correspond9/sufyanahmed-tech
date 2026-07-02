"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { footerContent, siteContent } from "@/constants/content";
import { Logo } from "@/components/site/logo";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#020617]/80">
      <div
        className="section-glow-divider absolute inset-x-0 top-0"
        aria-hidden
      />
      <Container>
        <div className="flex flex-col gap-8 py-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Logo />
            <p className="max-w-xs text-center text-[12px] leading-relaxed text-white/40 md:text-left">
              {siteContent.brand.tagline}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <NewsletterForm />
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <p className="text-[11px] text-white/35">
              {footerContent.copyright}
            </p>
            <div className="flex items-center gap-4">
              {footerContent.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] text-white/40 transition-colors hover:text-white/70"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg",
                  "border border-white/[0.08] bg-white/[0.04] text-white/50",
                  "hover:border-primary/30 hover:text-primary transition-all",
                )}
              >
                <ArrowUp className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
