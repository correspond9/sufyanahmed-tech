import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-display tracking-tight text-foreground", {
  variants: {
    level: {
      h1: "text-4xl font-bold sm:text-5xl lg:text-6xl",
      h2: "text-3xl font-semibold sm:text-4xl",
      h3: "text-2xl font-semibold sm:text-3xl",
      h4: "text-xl font-semibold",
      h5: "text-lg font-medium",
      h6: "text-base font-medium",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: "h2",
    align: "left",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends
    HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

export function Heading({
  as,
  level = "h2",
  align,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as ?? level ?? "h2";

  return (
    <Component
      className={cn(headingVariants({ level, align, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

export { headingVariants };
