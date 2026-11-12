import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";
import { pages } from "@/content/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...pages.map((p) => ({ url: `${siteUrl}${p.path}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
