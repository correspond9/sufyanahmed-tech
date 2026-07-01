import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BackgroundProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "grid" | "glow";
}

const variantClasses = {
  default: "bg-background",
  gradient: "bg-gradient-to-b from-background via-background to-surface",
  grid: "bg-background bg-grid",
  glow: "bg-background bg-glow",
} as const;

export function Background({
  variant = "default",
  className,
  children,
  ...props
}: BackgroundProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
