import type { ReactNode } from "react";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import { Background } from "@/components/ui/background";
import { metadata, viewport } from "@/config/metadata";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

export { metadata, viewport };

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Background variant="gradient">
            <ResponsiveLayout>{children}</ResponsiveLayout>
          </Background>
        </ThemeProvider>
      </body>
    </html>
  );
}
