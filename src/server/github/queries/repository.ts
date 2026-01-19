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
        const repos = await fetchAllRepos();

        const response = await Promise.all(repos.map(async (repo) => {
            var languages = await fetchAllRepoLanguages(repo.languages_url);
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
    }
);

function getTotalBytes(languages: RepoLanguages): number {
  return Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
}