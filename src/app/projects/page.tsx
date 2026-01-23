import Header from "@/components/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getGithubRepos } from "@/server/github/queries/repository";
import { FiExternalLink } from 'react-icons/fi';
import languageColors from 'github-language-colors';
type LanguageName = keyof typeof languageColors;

import { FaGithub } from "react-icons/fa";
import { RepoLanguages } from "@/server/github/types/language";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import RepoCard from "@/components/projects/RepoCard";
import GitHubOverviewCard from "@/components/projects/GitHubOverviewCard";

export const revalidate = 86400;

export default async function ProjectsPage() {
    const repos = await getGithubRepos();

    const aggregatedLanguages: RepoLanguages = {};

    repos.forEach((repo) => {
        if (!repo.languages) return;

        Object.entries(repo.languages).forEach(([language, bytes]) => {
            if (!aggregatedLanguages[language]) {
                aggregatedLanguages[language] = 0;
            }
            aggregatedLanguages[language] += bytes;
        });
    });

    const totalBytesAllRepos = Object.values(aggregatedLanguages).reduce(
        (sum, bytes) => sum + bytes,
        0
    );

    const aggregatedLanguageArray = Object.entries(aggregatedLanguages)
        .map(([language, bytes]) => ({
            language,
            bytes,
            percentage: ((bytes / totalBytesAllRepos) * 100).toFixed(1),
        }))
        .sort((a, b) => b.bytes - a.bytes);

    return (
        <div className="min-h-screen py-24 px-4 bg-background">
            <div className="container mx-auto max-w-7xl">
                <Header title="Projects" subTitle={<>A selection of <strong>professional</strong> projects built with modern technologies.</>} />

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 space-y-8 animate-in fade-in-50 duration-700">
                        {repos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </div>

                    <div className="space-y-6 animate-in fade-in-70 duration-1000">
                        <GitHubOverviewCard reposCount={repos.length} />

                        <Card className="border-border/50 shadow-xl">
                            <CardHeader>
                                <CardTitle>Languages Used</CardTitle>
                                <CardDescription>
                                    Overview of languages across all projects
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2 text-sm">
                                {aggregatedLanguageArray.map(({ language, percentage }) => {
                                    const color = language in languageColors
                                        ? languageColors[language as LanguageName]
                                        : "#6b7280";

                                    return (
                                        <span
                                            key={language}
                                            className="flex items-center gap-2 px-2 py-1 bg-muted rounded-md"
                                        >
                                            <span
                                                className="inline-block w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: color }}
                                            />
                                            {language} {percentage}%
                                        </span>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <ScrollToTopButton />
        </div>
    );
}