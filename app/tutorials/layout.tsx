import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Runnable KET Studio templates for histograms, matrices, metrics, circuits, charts and research artifacts.",
  alternates: { canonical: "/tutorials" },
};

export default function TutorialsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
