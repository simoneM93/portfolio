import Link from "next/link";
import { GitHubRepoWithLanguages } from "@/server/github/types/repository";
import { FiExternalLink } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { FaGithub } from "react-icons/fa";
import { getLanguageColor } from "@/lib/githubColors";

export default function RepoCard({ repo }: { repo: GitHubRepoWithLanguages }) {
    return (
        <Card
            key={repo.id}
            className="h-full border-border hover:border-foreground/30 transition-colors duration-300"
        >
            <CardHeader>
                <h2 data-slot="card-title" className="leading-none font-semibold flex items-center justify-between gap-4">
                    <Link
                        href={`/projects/${repo.name}`}
                        className="truncate hover:text-primary transition-colors"
                    >
                        {repo.name}
                    </Link>
                    <FaGithub className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                </h2>
                {repo.description && (
                    <CardDescription>{repo.description}</CardDescription>
                )}
            </CardHeader>

            <CardContent className="mt-auto space-y-4">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {repo.languages &&
                        Object.entries(repo.languages).sort((a, b) => b[1] - a[1]).map(async ([language, usage_bytes]) => {
                            const color = await getLanguageColor(language)
                            const percentage = ((usage_bytes / repo.totalBytes) * 100).toFixed(1);

                            return (
                                <span
                                    key={language}
                                    className="flex items-center gap-2 px-2 py-1 bg-muted rounded-md"
                                >
                                    <span
                                        className="inline-block w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: color }}
                                        aria-hidden="true"
                                    />
                                    {language} {percentage}%
                                </span>
                            );
                        })}
                </div>

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

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                        href={`/projects/${repo.name}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 "
                    >
                        Details
                    </Link>
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${repo.name} repository on GitHub (opens in new tab)`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-medium transition-all duration-300  group"
                    >
                        GitHub
                        <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
