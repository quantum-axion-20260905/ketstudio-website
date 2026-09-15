import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "KET Studio — Open quantum research workspace",
    template: "%s | KET Studio",
  },
  description:
    "KET Studio is an open-source Windows desktop workspace for visible and reproducible quantum experiments.",
  keywords: ["quantum computing", "KET Studio", "Flutter", "Python", "open source"],
  openGraph: {
    title: "KET Studio",
    description: "A Windows desktop workspace for visible and reproducible quantum experiments.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
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
