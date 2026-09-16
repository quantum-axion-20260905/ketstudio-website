import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description: "Explore KET Studio, an open-source Windows desktop research workspace for Python quantum experiments.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
