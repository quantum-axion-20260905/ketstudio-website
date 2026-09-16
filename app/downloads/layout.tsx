import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download KET Studio v1.3.1 for Windows 10/11 x64 as MSIX or EXE and verify the release checksums.",
  alternates: { canonical: "/downloads" },
};

export default function DownloadsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
