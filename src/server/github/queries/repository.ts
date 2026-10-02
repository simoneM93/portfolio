import { unstable_cache } from "next/cache";
import type { GitHubRepo } from "../types/repository";
import { RepoLanguages } from "../types/language";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchAllRepos(): Promise<GitHubRepo[]> {
    const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                ...(GITHUB_TOKEN && {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                }),
            },
            // IMPORTANTISSIMO
            next: { revalidate: 86400 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch GitHub repos");
    }

    return res.json();
}

async function fetchAllRepoLanguages(url: string): Promise<RepoLanguages> {
    const res = await fetch(
        url,
        {
            headers: {
                Accept: "application/vnd.github+json",
                ...(GITHUB_TOKEN && {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                }),
            },
            // IMPORTANTISSIMO
            next: { revalidate: 86400 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch GitHub repos");
    }

    return res.json();
}

export const getGithubRepos = unstable_cache(
    async () => {
        // Skip forks, archived repos and the profile README repo (thin/duplicate pages)
        const repos = (await fetchAllRepos()).filter(
            (r) => !r.fork && !r.archived && r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase()
        );

        const response = await Promise.all(repos.map(async (repo) => {
            const languages =await fetchAllRepoLanguages(repo.languages_url);
            return {
                ...repo,
                languages: languages,
                totalBytes: getTotalBytes(languages)
            }
        }));

        return response;
    },
    ["github-repos"],
    {
        tags: ["github"],
        revalidate: 86400,
    }
);

export async function getRepoReadmeHtml(repoName: string): Promise<string | null> {
    const res = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
        {
            headers: {
                Accept: "application/vnd.github.html+json",
                ...(GITHUB_TOKEN && {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                }),
            },
            next: { revalidate: 86400 },
        }
    );

    // ponytail: no README is normal, page renders without it.
    // Relative image/link paths in READMEs won't resolve here; use absolute URLs in READMEs.
    if (!res.ok) return null;
    // Page already has its own h1
    return (await res.text()).replace(/<(\/?)h1\b/g, "<$1h2");
}

function getTotalBytes(languages: RepoLanguages): number {
  return Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
}