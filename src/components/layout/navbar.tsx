import Link from "next/link";
import { navigationConfig, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-display text-foreground text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            {siteConfig.shortName}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navigationConfig.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-muted-foreground text-sm font-medium transition-colors",
                    "hover:text-foreground focus-visible:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-md px-4 py-2",
              "text-primary-foreground text-sm font-medium",
              "bg-primary transition-opacity hover:opacity-90",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
            )}
          >
            Contact
          </Link>
        </nav>
      </Container>
    </header>
  );
}
