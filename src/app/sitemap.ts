import type { MetadataRoute } from "next";
import { getGithubRepos } from "@/server/github/queries/repository";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repos = await getGithubRepos();
  const lastRepoUpdate = repos.reduce(
    (max, r) => (r.updated_at > max ? r.updated_at : max),
    "2026-04-01"
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(lastRepoUpdate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...repos.map((repo) => ({
      url: `${SITE_URL}/projects/${repo.name}`,
      lastModified: new Date(repo.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/skills`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
