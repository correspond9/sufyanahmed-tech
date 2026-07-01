import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerConfig, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Technology", href: "#tech" },
  { label: "Contact", href: "#contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-background/80 relative border-t border-white/[0.06]">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Link
              href="/"
              className="font-display text-foreground text-lg font-semibold tracking-tight"
            >
              {siteConfig.shortName}
            </Link>
            <p className="text-muted-foreground/90 max-w-xs text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            >
              {siteConfig.author.email}
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-muted-foreground mb-4 text-[11px] font-medium tracking-[0.12em] uppercase">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-muted-foreground text-sm transition-colors duration-300",
                      "hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-muted-foreground mb-4 text-[11px] font-medium tracking-[0.12em] uppercase">
              Connect
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] py-6">
          <p className="text-muted-foreground/70 text-center text-xs md:text-left">
            {footerConfig.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
