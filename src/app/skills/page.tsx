import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Image from "next/image";
import ViewCertButton from "@/components/skills/ViewCertButton";
import { getCategoriesWithSkillsAndCerts } from "@/lib/neon/restservice";
import { CategoryWithSkillsAndCerts, Certification } from "@/lib/neon/types/schema";

// const skillsData = [
//   // Languages Core
//   {
//     category: "Languages",
//     skills: [
//       {
//         name: "C#",
//         level: 98,
//         color: "bg-purple-500/20 border-purple-500/40",
//         icon: "⚡",
//       },
//       {
//         name: "C / C++",
//         level: 93,
//         color: "bg-gray-600/20 border-gray-600/40",
//         icon: "🚀",
//       },
//       {
//         name: "JavaScript / TypeScript",
//         level: 89,
//         color: "bg-yellow-500/20 border-yellow-500/40",
//         icon: "📜",
//       },
//       {
//         name: "Java",
//         level: 70,
//         color: "bg-orange-400/20 border-orange-400/40",
//         icon: "☕",
//       },
//     ],
//   },
//   // Frontend Stack
//   {
//     category: "Frontend",
//     skills: [
//       {
//         name: "React",
//         level: 90,
//         color: "bg-teal-500/20 border-teal-500/40",
//         icon: "⚛️",
//       },
//       {
//         name: "Next.js",
//         level: 88,
//         color: "bg-black/20 border-black/40",
//         icon: "🚀",
//       },
//       {
//         name: "Tailwind CSS",
//         level: 80,
//         color: "bg-indigo-500/20 border-indigo-500/40",
//         icon: "🎨",
//       },
//       {
//         name: "CSS / SCSS",
//         level: 82,
//         color: "bg-pink-500/20 border-pink-500/40",
//         icon: "💅",
//       },
//       {
//         name: "HTML5",
//         level: 84,
//         color: "bg-orange-500/20 border-orange-500/40",
//         icon: "🔤",
//       },
//       {
//         name: "Bootstrap",
//         level: 85,
//         color: "bg-purple-600/20 border-purple-600/40",
//         icon: "🅱️",
//       },
//     ],
//   },
//   // Backend & Database ⭐ CERTS
//   {
//     category: "Backend & DB",
//     skills: [
//       {
//         name: ".NET Framework / Core",
//         level: 96,
//         color: "bg-blue-500/20 border-blue-500/40",
//         icon: "🔧",
//       },
//       {
//         name: "Node.js",
//         level: 90,
//         color: "bg-green-500/20 border-green-500/40",
//         icon: "🟢",
//       },
//       {
//         name: "SQL / MySQL",
//         level: 93,
//         color: "bg-cyan-500/20 border-cyan-500/40",
//         icon: "🗄️",
//       },
//       {
//         name: "Supabase / Firebase",
//         level: 91,
//         color: "bg-pink-500/20 border-pink-500/40",
//         icon: "☁️",
//       },
//     ],
//   },
//   // Enterprise ⭐ CERTS EVIDENZIATE
//   {
//     category: "Enterprise",
//     skills: [
//       {
//         name: "MuleSoft",
//         level: 97,
//         color: "bg-orange-500/20 border-orange-500/40",
//         icon: "🔗",
//       },
//       {
//         name: "Salesforce Commerce Cloud",
//         level: 95,
//         color: "bg-blue-600/20 border-blue-600/40",
//         icon: "🛒",
//         cert: true,
//       },
//     ],
//   },
//   // DevOps & Tools
//   {
//     category: "DevOps & Tools",
//     skills: [
//       {
//         name: "Git / GitHub / BitBucket",
//         level: 96,
//         color: "bg-gray-800/20 border-gray-800/40",
//         icon: "📦",
//       },
//       {
//         name: "Azure DevOps",
//         level: 90,
//         color: "bg-blue-400/20 border-blue-400/40",
//         icon: "☁️",
//       },
//       {
//         name: "Atlassian (Jira/Confluence)",
//         level: 88,
//         color: "bg-blue-700/20 border-blue-700/40",
//         icon: "📋",
//       },
//     ],
//   },
// ];

// const certifications = [
//   {
//     "name": "Salesforce Commerce Cloud Developer 1",
//     "icon": "🛒",
//     "level": 95,
//     "color": "bg-blue-600/20 border-blue-600/40",
//     "issuer": "Salesforce",
//     "date": "2025-12",
//     "certUrl": "https://trust.salesforce.com/#cert"
//   },
//   {
//     "name": "MuleSoft Developer 1 (in corso)",
//     "icon": "🔗",
//     "level": 97,
//     "color": "bg-orange-500/20 border-orange-500/40",
//     "issuer": "MuleSoft",
//     "date": "2026-01",
//     "certUrl": "#"
//   }
// ]

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
                          {/* <span className="text-lg">{skill.icon}</span> */}
                          <span className="text-lg"></span>
                          {item.skill.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {/* {skill.certifications.length > 0 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-linear-to-r from-orange-500/20 to-blue-500/20 border-orange-500/40 px-2.5 py-1 font-semibold shadow-md"
                            >
                              Developer 1 Cert
                            </Badge>
                          )} */}
                          <Badge
                            variant="outline"
                            className="text-xs px-2.5 py-1"
                          >
                            {item.skill.level}%
                          </Badge>
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-muted/50 rounded-full h-2.5 group-hover:h-3 transition-all duration-500 overflow-hidden shadow-sm">
                        <div
                          // className={`h-full rounded-full bg-linear-to-r from-primary to-secondary shadow-md ${skill.color} transition-all duration-700`}
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
        <Header
          title="Certifications"
          subTitle=""
          showHomeButton={false}
        />

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
                <ViewCertButton pdfUrl={cert.pdf_url} certName={cert.name} iconUrl={cert.icon_url}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
