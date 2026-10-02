import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import { Award, Calendar, ShieldCheck } from "lucide-react";
import ViewCertButton from "@/components/skills/ViewCertButton";
import { getCategoriesWithSkillsAndCerts } from "@/server/queries/skill";

import type { Certification } from "@/server/schema/certification";
import type { CategoryWithSkillsAndCerts } from "@/server/types/CategoryWithSkillsAndCerts";
import { DynamicIcon } from "@/components/DynamicIcon";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Metadata } from "next";
import { baseOpenGraph, PERSON_ID, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Skills & Certifications",
  description:
    "Technical skills: Next.js, React, TypeScript, .NET Core, MuleSoft, Salesforce Commerce Cloud, Tailwind CSS.",
  alternates: {
    canonical: "https://portfolio.simonemarano.com/skills",
  },
  keywords: [
    "Next.js skills",
    "Salesforce Commerce Cloud certification",
    "TypeScript developer",
    "Full Stack skills",
    ".Net Core developer",
  ],
  openGraph: {
    ...baseOpenGraph,
    url: `${SITE_URL}/skills`,
    title: "Skills & Certifications | Simone Marano Portfolio",
    description: "Complete technical stack and certifications.",
  },
};

// Self-rated % reads as arbitrary to recruiters; show a coarse tier instead
function skillTier(level: number) {
  if (level >= 80) return { label: "Expert", bars: 3 };
  if (level >= 60) return { label: "Advanced", bars: 2 };
  return { label: "Familiar", bars: 1 };
}

function formatIssued(issued: string) {
  const date = new Date(issued);
  return isNaN(date.getTime())
    ? issued
    : date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default async function SkillsPage() {
  const categoryWithSkillsAndCerts: CategoryWithSkillsAndCerts[] = await getCategoriesWithSkillsAndCerts();

  const certifications: Certification[] = categoryWithSkillsAndCerts
    .flatMap(category =>
      category.skills
        .filter(skill => skill.certifications && skill.certifications.length > 0)
        .flatMap(skill => skill.certifications!)
    )
    .sort((a, b) => new Date(b.issued).getTime() - new Date(a.issued).getTime())

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
              { "@type": "ListItem", "position": 2, "name": "Skills & Certifications", "item": "https://portfolio.simonemarano.com/skills" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": PERSON_ID,
            "name": "Simone Marano",
            "hasCredential": certifications.map((cert) => ({
              "@type": "EducationalOccupationalCredential",
              "name": cert.name,
              "credentialCategory": "certification",
              "url": cert.verify_url,
              "recognizedBy": { "@type": "Organization", "name": cert.issuer },
            })),
          })
        }}
      />
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Header
          title="Skills & Certifications"
          subTitle={<>Full-stack stack: <strong>.NET Core</strong> and <strong>C#</strong> backends, <strong>MuleSoft</strong> and <strong>Salesforce Commerce Cloud</strong> integrations, <strong>React</strong> and <strong>Next.js</strong> frontends.</>}
        />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categoryWithSkillsAndCerts.map((group, idx) => (
            <section
              key={group.category.id}
              aria-labelledby={`cat-${group.category.id}`}
              className="space-y-5 animate-in fade-in-50 slide-in-from-bottom-4 p-6 rounded-2xl border border-border bg-card/50"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <h2 id={`cat-${group.category.id}`} className="flex items-center gap-3 pb-4 border-b border-border text-xl font-bold">
                <span className="w-1 h-6 bg-primary rounded-full" aria-hidden="true" />
                {group.category.name}
              </h2>

              <ul className="space-y-4">
                {group.skills
                  .sort((a, b) => b.skill.level - a.skill.level)
                  .map((item) => {
                    const tier = skillTier(item.skill.level);
                    return (
                      <li key={item.skill.name} className="flex justify-between items-center gap-3">
                        <span className="flex items-center gap-3 font-semibold text-foreground">
                          <DynamicIcon iconName={item.skill.icon_name} className="text-2xl shrink-0" style={{ color: item.skill.icon_color ?? "currentColor" }} />
                          {item.skill.name}
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                          {tier.label}
                          <span className="flex gap-0.5" aria-hidden="true">
                            {[1, 2, 3].map((n) => (
                              <span key={n} className={`h-3 w-1.5 rounded-sm ${n <= tier.bars ? "bg-primary" : "bg-muted"}`} />
                            ))}
                          </span>
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </div>

        {/* Certifications Grid */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Certifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {certifications.map((cert, idx) => (
            <article
              key={cert.name}
              className="group relative overflow-hidden rounded-2xl p-6 border border-border hover:border-primary/40 bg-card/50 transition-colors duration-300 animate-in fade-in-30 slide-in-from-bottom-2 flex flex-col"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`absolute inset-0 ${cert.color} opacity-10 group-hover:opacity-20 transition-opacity`} aria-hidden="true" />

              <div className="relative mb-5 mx-auto w-16 h-16">
                <Image
                  src={cert.icon_url}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover rounded-xl"
                />
              </div>

              <h3 className="relative text-lg font-bold text-foreground mb-3 text-center leading-tight">
                {cert.name}
              </h3>

              <dl className="relative space-y-1.5 mb-6 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <dt className="sr-only">Issuer</dt>
                  <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <dd>{cert.issuer}</dd>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <dt className="sr-only">Issued</dt>
                  <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <dd>{formatIssued(cert.issued)}</dd>
                </div>
              </dl>

              <div className="relative mt-auto flex flex-col gap-2">
                <a
                  href={cert.verify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.name} on ${cert.issuer} (opens in new tab)`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors text-sm"
                >
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Verify
                </a>
                <ViewCertButton pdfUrl={cert.pdf_url} certName={cert.name} iconUrl={cert.icon_url} />
              </div>
            </article>
          ))}
        </div>
      <div className="text-center mt-12 text-muted-foreground">
        <p>See these skills in action —{' '}
          <Link href="/projects" className="text-primary hover:underline font-medium">
            View Projects →
          </Link>
        </p>
      </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
