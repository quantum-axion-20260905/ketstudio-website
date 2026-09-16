import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ketstudio.space";
const lastModified = new Date("2026-09-16T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ["/", "weekly", 1],
    ["/projects", "monthly", 0.8],
    ["/projects/ket-studio", "monthly", 0.9],
    ["/docs", "weekly", 0.95],
    ["/tutorials", "weekly", 0.9],
    ["/downloads", "weekly", 0.85],
  ].map(([path, changeFrequency, priority]) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: priority as number,
  }));
}
