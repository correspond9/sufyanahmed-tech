import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <div className="relative flex size-9 items-center justify-center">
        <div
          className="from-primary to-purple absolute inset-0 bg-gradient-to-br opacity-90 shadow-[0_0_20px_rgba(79,140,255,0.4)]"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        <div
          className="absolute inset-[2px] bg-[#020617]/85"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        <span className="relative text-[10px] font-bold tracking-tight text-white">
          SA
        </span>
      </div>
      <span className="font-display text-[15px] font-semibold tracking-tight text-white">
        SufyanAhmed.Tech
      </span>
    </Link>
  );
}
