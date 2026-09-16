import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language";
import { SiteShell } from "@/components/site-shell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://169.58.123.200:3010";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KET Studio — Open quantum research workspace",
    template: "%s | KET Studio",
  },
  description:
    "KET Studio is an open-source Windows desktop workspace for running Python quantum experiments, real terminal workflows and reproducible visual evidence.",
  keywords: ["quantum computing", "quantum experiments", "KET Studio", "Flutter", "Python", "Qiskit", "research reproducibility", "open source"],
  authors: [{ name: "KET Studio contributors" }],
  creator: "KET Studio contributors",
  publisher: "KET Studio",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "KET Studio — Open quantum research workspace",
    description: "Run Python quantum experiments in a real Windows terminal and review reproducible visual evidence.",
    url: siteUrl,
    siteName: "KET Studio",
    locale: "uz_UZ",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "KET Studio — Open quantum research workspace",
    description: "A Windows desktop workspace for visible and reproducible quantum experiments.",
  },
  icons: { icon: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "KET Studio",
      url: siteUrl,
      description: "Open-source Windows desktop workspace for visible and reproducible quantum experiments.",
      inLanguage: ["uz", "en"],
    },
    {
      "@type": "SoftwareApplication",
      name: "KET Studio",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows 10/11 x64",
      softwareVersion: "1.3.1",
      url: siteUrl,
      downloadUrl: `${siteUrl}/downloads`,
      license: "https://github.com/quantum-axion-20260905/KET-Studio/blob/main/LICENSE",
      codeRepository: "https://github.com/quantum-axion-20260905/KET-Studio",
      description: "A local research workspace for Python quantum experiments, real terminal execution and event-driven visualization.",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
