import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

import { getGithubRepos, getRepoReadmeHtml } from '@/server/github/queries/repository';
import { getLanguageColor } from '@/lib/githubColors';
import { baseOpenGraph, PERSON_ID, SITE_URL } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export const revalidate = 86400;

export async function generateStaticParams() {
    const repos = await getGithubRepos();
    return repos.map((repo) => ({ slug: repo.name }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const repos = await getGithubRepos();
    const repo = repos.find((r) => r.name === slug);

    if (!repo) return { title: 'Project Not Found' };

    const url = `${SITE_URL}/projects/${repo.name}`;

    return {
        title: `${repo.name} – ${repo.language ?? 'Open Source'} Project`,
        description:
            repo.description ??
            `Open source project ${repo.name} by Simone Marano — Full-Stack Developer.`,
        alternates: {
            canonical: url,
        },
        openGraph: {
            ...baseOpenGraph,
            url,
            title: `${repo.name} | Simone Marano`,
            description:
                repo.description ??
                `Open source project by Simone Marano — Full-Stack Developer.`,
        },
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const repos = await getGithubRepos();
    const repo = repos.find((r) => r.name === slug);

    if (!repo) notFound();

    const readmeHtml = await getRepoReadmeHtml(repo.name);

    const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
    });

    return (
        <div id="main-content" className="min-h-screen py-24 px-4 bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareSourceCode',
                        name: repo.name,
                        description: repo.description,
                        url: repo.html_url,
                        codeRepository: repo.html_url,
                        programmingLanguage: Object.keys(repo.languages).map((l) => ({
                            '@type': 'ComputerLanguage',
                            name: l,
                        })),
                        author: {
                            '@type': 'Person',
                            '@id': PERSON_ID,
                            name: 'Simone Marano',
                            url: SITE_URL,
                        },
                        dateModified: repo.updated_at,
                        ...(repo.homepage && { sameAs: repo.homepage }),
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://portfolio.simonemarano.com',
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Projects',
                                item: 'https://portfolio.simonemarano.com/projects',
                            },
                            {
                                '@type': 'ListItem',
                                position: 3,
                                name: repo.name,
                                item: `https://portfolio.simonemarano.com/projects/${repo.name}`,
                            },
                        ],
                    }),
                }}
            />

            <div className="container mx-auto max-w-4xl">
                {/* Back link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-12 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                    All Projects
                </Link>

                {/* Title */}
                <div className="text-center mb-12 animate-in fade-in-30 duration-1000">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaGithub className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                        <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                            {repo.name}
                        </h1>
                    </div>
                    {repo.description && (
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {repo.description}
                        </p>
                    )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-6 mb-12 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1.5">
                        <FaStar className="text-yellow-400" aria-hidden="true" />
                        {repo.stargazers_count} stars
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FaCodeBranch aria-hidden="true" />
                        {repo.forks_count} forks
                    </span>
                    <span>Updated {updatedAt}</span>
                </div>

                <div className="space-y-10">
                    {/* Languages */}
                    {Object.keys(repo.languages).length > 0 && (
                        <section aria-labelledby="languages-heading" className="p-6 rounded-2xl border border-border/30 bg-card/50">
                            <h2 id="languages-heading" className="text-xl font-bold mb-4">
                                Languages
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {await Promise.all(
                                    Object.entries(repo.languages).map(async ([lang, bytes]) => {
                                        const color = await getLanguageColor(lang);
                                        const pct = ((bytes / repo.totalBytes) * 100).toFixed(1);
                                        return (
                                            <span
                                                key={lang}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm"
                                            >
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                                    style={{ backgroundColor: color }}
                                                    aria-hidden="true"
                                                />
                                                {lang} {pct}%
                                            </span>
                                        );
                                    })
                                )}
                            </div>
                        </section>
                    )}

                    {/* Topics */}
                    {repo.topics?.length > 0 && (
                        <section aria-labelledby="topics-heading" className="p-6 rounded-2xl border border-border/30 bg-card/50">
                            <h2 id="topics-heading" className="text-xl font-bold mb-4">
                                Topics
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {repo.topics.map((t) => (
                                    <Badge key={t} variant="outline" className="text-sm">
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* README (HTML already sanitized by GitHub) */}
                    {readmeHtml && (
                        <section aria-labelledby="readme-heading" className="p-6 rounded-2xl border border-border/30 bg-card/50">
                            <h2 id="readme-heading" className="text-xl font-bold mb-4">
                                README
                            </h2>
                            <div className="readme" dangerouslySetInnerHTML={{ __html: readmeHtml }} />
                        </section>
                    )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${repo.name} on GitHub (opens in new tab)`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02]"
                    >
                        <FaGithub aria-hidden="true" /> View on GitHub
                    </a>
                    {repo.homepage && (
                        <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View live demo of ${repo.name} (opens in new tab)`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all hover:scale-[1.02]"
                        >
                            <FiExternalLink aria-hidden="true" /> Live Demo
                        </a>
                    )}
                </div>
            </div>
            <ScrollToTopButton />
        </div>
    );
}
