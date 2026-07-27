import type { MetadataRoute } from "next";

const routes = [
  { path: "", priority: 1 },
  { path: "/ecosystem", priority: 0.9 },
  { path: "/networks", priority: 0.8 },
  { path: "/validators", priority: 0.8 },
  { path: "/about", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `https://burrito.money${path || "/"}`,
    changeFrequency: "weekly",
    priority,
  }));
}
