import Link from "next/link";
import { footerConfig, navigationConfig, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-border/60 bg-background border-t">
      <Container>
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="font-display text-foreground text-lg font-semibold">
              {siteConfig.shortName}
            </p>
            <p className="text-muted-foreground max-w-sm text-sm">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navigationConfig.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-muted-foreground text-sm transition-colors",
                      "hover:text-foreground focus-visible:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-border/60 border-t py-6">
          <p className="text-muted-foreground text-center text-xs md:text-left">
            {footerConfig.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
