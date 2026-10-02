import Link from "next/link";
import Header from "@/components/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getGithubRepos } from "@/server/github/queries/repository";

import { RepoLanguages } from "@/server/github/types/language";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import RepoCard from "@/components/projects/RepoCard";
import { Metadata } from "next";
import { getLanguageColor } from "@/lib/githubColors";
import { baseOpenGraph, SITE_URL } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Open source projects by Simone Marano: ASP.NET Core libraries, Next.js and TypeScript apps. Source code, languages and live demos.",
    alternates: {
        canonical: "https://portfolio.simonemarano.com/projects",
    },
    keywords: [
        "Next.js projects",
        "MuleSoft projects",
        ".NET Core portfolio",
        "Salesforce developer",
    ],
    openGraph: {
        ...baseOpenGraph,
        url: `${SITE_URL}/projects`,
        title: "Projects | Simone Marano Portfolio",
        description: "Open source projects by Simone Marano: ASP.NET Core libraries, Next.js and TypeScript apps.",
    },
};

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

    const sortedLanguages = Object.entries(aggregatedLanguages).sort((a, b) => b[1] - a[1]);
    // Top languages + "Other" bucket, so tiny slivers don't clutter the bar
    const topLanguages = sortedLanguages.slice(0, 6);
    const otherBytes = sortedLanguages.slice(6).reduce((sum, [, bytes]) => sum + bytes, 0);
    if (otherBytes > 0) topLanguages.push(["Other", otherBytes]);

    const languageStats = await Promise.all(
        topLanguages.map(async ([language, bytes]) => ({
            language,
            percentage: ((bytes / totalBytesAllRepos) * 100).toFixed(1),
            color: language === "Other" ? "var(--muted-foreground)" : await getLanguageColor(language),
        }))
    );

    return (
        <div id="main-content" className="min-h-screen py-24 px-4 bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://portfolio.simonemarano.com" },
                            { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://portfolio.simonemarano.com/projects" }
                        ]
                    })
                }}
            />
            <div className="container mx-auto max-w-7xl">
                <Header title="Projects" subTitle={<>Open source <strong>libraries</strong> and <strong>apps</strong> from my GitHub, built with modern technologies.</>} />

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 animate-in fade-in-50 duration-700">
                        {repos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))}
                    </div>

                    <Card className="border-border lg:sticky lg:top-20 animate-in fade-in-70 duration-1000">
                        <CardHeader>
                            <CardTitle>Languages Used</CardTitle>
                            <CardDescription>
                                Across {repos.length} public GitHub repositories
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
                                {languageStats.map(({ language, percentage, color }) => (
                                    <span key={language} style={{ width: `${percentage}%`, backgroundColor: color }} />
                                ))}
                            </div>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {languageStats.map(({ language, percentage, color }) => (
                                    <li key={language} className="flex items-center gap-2 min-w-0">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
                                        <span className="truncate">{language}</span>
                                        <span className="ml-auto text-muted-foreground tabular-nums">{percentage}%</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="container mx-auto max-w-7xl mt-12 text-center text-muted-foreground">
                <p>Want to know the technologies behind these projects?{' '}
                    <Link href="/skills" className="text-primary hover:underline font-medium">
                        Skills &amp; Certifications →
                    </Link>
                </p>
            </div>
            <ScrollToTopButton />
        </div>
    );
}