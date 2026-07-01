"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteContent } from "@/constants/content";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

function NavItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = (href === "#home" && pathname === "/") || label === "Home";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative px-3 py-2 text-[13px] font-medium transition-colors duration-300",
        isActive ? "text-white" : "text-white/55 hover:text-white/90",
      )}
    >
      {label}
      {isActive && (
        <span className="bg-primary absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(79,140,255,0.8)]" />
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="border-b border-white/[0.06] bg-[#020617]/60 backdrop-blur-2xl backdrop-saturate-150">
        <Container className="flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Main navigation"
          >
            {siteContent.nav.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.div
              className="hidden sm:block"
              whileHover={
                mounted && !prefersReducedMotion ? { scale: 1.02 } : undefined
              }
              whileTap={
                mounted && !prefersReducedMotion ? { scale: 0.98 } : undefined
              }
            >
              <Link
                href="#contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5",
                  "text-[13px] font-medium text-white",
                  "border border-white/[0.1] bg-white/[0.06]",
                  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_24px_-4px_rgba(79,140,255,0.35)]",
                  "hover:border-primary/30 hover:bg-primary/10 transition-all duration-300",
                )}
              >
                Let&apos;s Connect
                <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>

            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/70 xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.06] bg-[#020617]/95 backdrop-blur-2xl xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {siteContent.nav.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-[13px] font-medium text-white sm:hidden"
              >
                Let&apos;s Connect
                <ArrowRight className="size-3.5" />
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
