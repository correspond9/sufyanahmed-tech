import type { ReactNode } from "react";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { Background } from "@/components/ui/background";
import { metadata, viewport } from "@/config/metadata";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import "./globals.css";

export { metadata, viewport };

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <JsonLd />
        <ThemeProvider>
          <SmoothScrollProvider>
            <Background variant="gradient">
              <AmbientBackground />
              <div className="relative z-10">
                <ResponsiveLayout>{children}</ResponsiveLayout>
              </div>
            </Background>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
