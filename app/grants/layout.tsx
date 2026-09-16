import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grant roadmap",
  description: "KET Studio’s open-source roadmap for reproducibility, provenance, validation, research UX and safe distribution.",
  alternates: { canonical: "/grants" },
};

export default function GrantsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
