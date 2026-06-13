import type { MetadataRoute } from "next";
import { allInstallers } from "@/data/installers/index";
import { posts } from "@/app/blog/page";

const BASE = "https://greenhomens.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/installers", changeFrequency: "weekly", priority: 0.9 },
    { path: "/rebates", changeFrequency: "weekly", priority: 0.9 },
    { path: "/heat-pumps", changeFrequency: "monthly", priority: 0.8 },
    { path: "/solar", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides", changeFrequency: "monthly", priority: 0.6 },
    { path: "/guides/oil-to-heat-pump", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "yearly", priority: 0.4 },
    { path: "/compare", changeFrequency: "monthly", priority: 0.6 },
    { path: "/quote", changeFrequency: "monthly", priority: 0.7 },
    { path: "/tools", changeFrequency: "monthly", priority: 0.6 },
    { path: "/tools/bill-impact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tools/carbon-calculator", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tools/heat-pump-sizer", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tools/payback-calculator", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tools/rebate-guide", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tools/rebate-quiz", changeFrequency: "monthly", priority: 0.5 },
    { path: "/tools/savings-calculator", changeFrequency: "monthly", priority: 0.5 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/affiliate-disclosure", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const installerEntries: MetadataRoute.Sitemap = allInstallers.map((i) => ({
    url: `${BASE}/installers/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...installerEntries, ...blogEntries];
}
