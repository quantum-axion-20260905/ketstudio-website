import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KET Studio desktop workspace",
  description: "Write, run and inspect Python quantum experiments with a real Windows terminal and event-driven visual evidence.",
  alternates: { canonical: "/projects/ket-studio" },
};

export default function KetStudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
