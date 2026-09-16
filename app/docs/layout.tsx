import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn KET Studio from installation and Python setup to visualization APIs, real terminal use and reproducible research archives.",
  alternates: { canonical: "/docs" },
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
