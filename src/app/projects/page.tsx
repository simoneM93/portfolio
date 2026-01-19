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
                {/* Header */}
                <Header
                    title="Projects"
                    subTitle={
                        <>
                            A selection of <strong>open-source</strong> and{" "}
                            <strong>professional</strong> projects built with modern
                            technologies.
                        </>
                    }
                />

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Projects list */}
                    <div className="lg:col-span-2 space-y-8 animate-in fade-in-50 duration-700">
                        {repos.map((repo) => (
                            <Card
                                key={repo.id}
                                className="border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between gap-4">
                                        <span className="truncate">{repo.name}</span>
                                        <FaGithub className="h-5 w-5 text-muted-foreground shrink-0" />
                                    </CardTitle>
                                    {repo.description && (
                                        <CardDescription>{repo.description}</CardDescription>
                                    )}
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Meta */}
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        {repo.languages &&
                                            Object.entries(repo.languages).map(([language, usage_bytes]) => {
                                                const color = language in languageColors ? languageColors[language as LanguageName] : '#6b7280';
                                                const percentage = ((usage_bytes / repo.totalBytes) * 100).toFixed(1);

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
                                    </div>

                                    {/* Topics */}
                                    {repo.topics?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {repo.topics.map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-6 pt-2">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg 
             text-primary font-medium transition-all duration-300 hover:scale-[1.05] group"
                                        >
                                            View Repository
                                            <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 animate-in fade-in-70 duration-1000">
                        {/* GitHub stats */}
                        <Card className="border-border/50 shadow-xl">
                            <CardHeader>
                                <CardTitle>GitHub Overview</CardTitle>
                                <CardDescription>
                                    Activity summary
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p>
                                    <strong>Public repositories:</strong> {repos.length}
                                </p>
                                {/* <p>
                                    <strong>Total stars:</strong> {totalStars}
                                </p> */}
                            </CardContent>
                        </Card>

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
        </div>
    );
}