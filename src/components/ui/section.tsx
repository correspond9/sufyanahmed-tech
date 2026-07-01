import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  containerSize?: "default" | "narrow" | "wide";
  spacing?: "default" | "sm" | "lg" | "none";
}

const spacingClasses = {
  none: "",
  sm: "py-12 md:py-16",
  default: "py-16 md:py-24",
  lg: "py-24 md:py-32",
} as const;

export function Section({
  as: Component = "section",
  containerSize = "default",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component className={cn(spacingClasses[spacing], className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </Component>
  );
}
