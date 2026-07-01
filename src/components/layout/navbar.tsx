"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { navigationConfig, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  return (
    <Link
      href={href}
      className={cn(
        "group relative px-1 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {isActive && mounted && !prefersReducedMotion ? (
        <motion.span
          layoutId="nav-indicator"
          className="bg-primary absolute -bottom-px left-0 h-px w-full shadow-[0_0_8px_rgba(79,140,255,0.6)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : isActive ? (
        <span className="bg-primary absolute -bottom-px left-0 h-px w-full" />
      ) : (
        <span className="bg-primary/0 group-hover:bg-primary/50 absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 group-hover:left-0 group-hover:w-full group-hover:translate-x-0" />
      )}
    </Link>
  );
}

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  return (
    <header className="bg-background/50 sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl backdrop-saturate-150">
      <Container>
        <nav
          className="flex h-[4.25rem] items-center justify-between gap-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-display text-foreground group relative text-[17px] font-semibold tracking-tight transition-opacity duration-300 hover:opacity-90"
          >
            <span className="relative z-10">{siteConfig.shortName}</span>
            <span className="from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-purple/5 absolute -inset-x-3 -inset-y-1.5 rounded-lg bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navigationConfig.main.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>

          <motion.div
            whileHover={
              mounted && !prefersReducedMotion ? { scale: 1.02 } : undefined
            }
            whileTap={
              mounted && !prefersReducedMotion ? { scale: 0.98 } : undefined
            }
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-lg px-5 py-2.5",
                "text-primary-foreground text-[13px] font-medium tracking-wide",
                "bg-primary border-primary/30 shadow-glow border",
                "transition-all duration-300",
                "hover:shadow-[0_0_28px_-4px_rgba(79,140,255,0.55)]",
                "hover:-translate-y-px",
                "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              )}
            >
              Contact
            </Link>
          </motion.div>
        </nav>
      </Container>
    </header>
  );
}
