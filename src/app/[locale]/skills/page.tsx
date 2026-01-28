import Image from "next/image";

import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import ViewCertButton from "@/components/skills/ViewCertButton";
import { getCategoriesWithSkillsAndCerts } from "@/server/queries/skill";

import type { Certification } from "@/server/schema/certification";
import type { CategoryWithSkillsAndCerts } from "@/server/types/CategoryWithSkillsAndCerts";
import { DynamicIcon } from "@/components/DynamicIcon";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Skills & Certifications - Simone Marano",
  description:
    "Technical skills: Next.js, React, TypeScript, .NET Core, MuleSoft, Salesforce Commerce Cloud, Tailwind CSS.",
  keywords: [
    "Next.js skills",
    "Salesforce Commerce Cloud certification",
    "TypeScript developer",
    "Full Stack skills",
    ".Net Core developer",
  ],
  openGraph: {
    title: "Skills & Certifications | Simone Marano Portfolio",
    description: "Complete technical stack and certifications.",
  },
};


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
    <div className="min-h-screen py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Header
          title="Skills"
          subTitle=""
        />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categoryWithSkillsAndCerts.map((group, idx) => (
            <div
              key={group.category.id}
              className={`space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 p-6 rounded-2xl border border-border/30 hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 ${idx === 0
                ? "duration-200"
                : idx === 1
                  ? "duration-400"
                  : idx === 2
                    ? "duration-600"
                    : idx === 3
                      ? "duration-800"
                      : "duration-1000"
                }`}
            >
              {/* Categoria */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <div className="w-2 h-8 bg-linear-to-b from-primary to-secondary rounded-full" />
                <h3 className="text-xl font-bold text-foreground">
                  {group.category.name}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {group.skills
                  .sort((a, b) => b.skill.level - a.skill.level)
                  .map((item) => (
                    <div key={item.skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 font-semibold text-foreground">
                          <DynamicIcon iconName={item.skill.icon_name} className="text-3xl" style={{ color: item.skill.icon_color ?? "white" }} />
                          <span className="text-lg"></span>
                          {item.skill.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="text-xs px-2.5 py-1"
                          >
                            {item.skill.level}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2.5 group-hover:h-3 transition-all duration-500 overflow-hidden shadow-sm">
                        <div
                          className={`h-full rounded-full bg-linear-to-r from-primary to-secondary shadow-md transition-all duration-700`}
                          style={{ width: `${item.skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <Header title="Certifications" subTitle="" showHomeButton={false} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {certifications.map((cert, idx) => (
            <div
              key={cert.name}
              className={`group relative overflow-hidden rounded-2xl p-8 border-2 border-border/30 hover:border-primary/60 bg-linear-to-br from-card/80 to-muted/50 backdrop-blur-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2 animate-in fade-in-30 slide-in-from-bottom-2 delay-${idx * 100}`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${cert.color} opacity-20 group-hover:opacity-40 transition-opacity`} />

              {/* Icon Emoji */}
              <div className="relative z-10 mb-6 p-4 transition-all mx-auto w-20 h-20">
                <Image
                  src={cert.icon_url}
                  alt={cert.name}
                  fill
                  priority
                  sizes="80px"
                  className="object-cover brightness-110 saturate-110 rounded-xl"
                />
              </div>

              {/* Nome Certificazione */}
              <h4 className="text-xl font-bold text-foreground mb-3 text-center relative z-10 leading-tight">
                {cert.name}
              </h4>

              {/* Dettagli */}
              <div className="space-y-2 mb-8 relative z-10 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🏆</span>
                  {cert.issuer}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs opacity-75">
                  <span>📅</span>
                  {cert.issued}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="relative z-10 pt-4 flex flex-col gap-3 ">

                {/* Verifica */}
                <a
                  href={cert.verify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-primary/20 backdrop-blur-sm text-sm text-center"
                >
                  🔍 Verify on {cert.issuer}
                </a>

                {/* Visualizza PDF */}
                <ViewCertButton pdfUrl={cert.pdf_url} certName={cert.name} iconUrl={cert.icon_url} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
