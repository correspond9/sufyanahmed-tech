import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/constants/content";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <Image
        src="/assets/logos/Name-logo.png"
        alt={`${siteContent.brand.name} logo`}
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 object-contain"
        priority
      />
      <span className="font-display text-[15px] font-semibold tracking-tight text-white">
        {siteContent.brand.name}
      </span>
    </Link>
  );
}
