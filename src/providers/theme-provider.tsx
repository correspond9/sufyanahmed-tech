"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { themeConfig } from "@/config/theme";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={themeConfig.attribute}
      defaultTheme={themeConfig.defaultTheme}
      forcedTheme={themeConfig.forcedTheme}
      enableSystem={themeConfig.enableSystem}
      disableTransitionOnChange={themeConfig.disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
