import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Quantum Axion — Open quantum research tools",
    template: "%s | Quantum Axion",
  },
  description:
    "Open-source tools for visible, reproducible and accessible quantum computing research.",
  keywords: ["quantum computing", "KET Studio", "Quantum Circuit", "open source"],
  openGraph: {
    title: "Quantum Axion",
    description: "Making quantum research visible, reproducible and open.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
