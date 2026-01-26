import { GitHubRepoWithLanguages } from "@/server/github/types/repository";
import { FiExternalLink } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaGithub } from "react-icons/fa";
import { getLanguageColor } from "@/lib/githubColors";

export default function RepoCard({ repo }: { repo: GitHubRepoWithLanguages }) {
    return (
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
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {repo.languages &&
                        Object.entries(repo.languages).map(async ([language, usage_bytes]) => {
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

                <div className="flex gap-6 pt-2">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary font-medium transition-all duration-300 hover:scale-[1.05] group"
                    >
                        View Repository
                        <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}