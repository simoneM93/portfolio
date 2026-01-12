import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, SquareArrowOutUpLeft, ArrowBigDown, ArrowBigUp, ArrowUp } from 'lucide-react';
import Header from '@/components/Header';

const skillsData = [
  // Languages Core
  {
    category: 'Languages',
    skills: [
      { name: 'C#', level: 98, color: 'bg-purple-500/20 border-purple-500/40', icon: '⚡' },
      { name: 'C / C++', level: 93, color: 'bg-gray-600/20 border-gray-600/40', icon: '🚀' },
      { name: 'JavaScript / TypeScript', level: 89, color: 'bg-yellow-500/20 border-yellow-500/40', icon: '📜' },
      { name: 'Java', level: 70, color: 'bg-orange-400/20 border-orange-400/40', icon: '☕' },
    ]
  },
  // Frontend Stack
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 90, color: 'bg-teal-500/20 border-teal-500/40', icon: '⚛️' },
      { name: 'Next.js', level: 88, color: 'bg-black/20 border-black/40', icon: '🚀' },
      { name: 'Tailwind CSS', level: 80, color: 'bg-indigo-500/20 border-indigo-500/40', icon: '🎨' },
      { name: 'CSS / SCSS', level: 82, color: 'bg-pink-500/20 border-pink-500/40', icon: '💅' },
      { name: 'HTML5', level: 84, color: 'bg-orange-500/20 border-orange-500/40', icon: '🔤' },
      { name: 'Bootstrap', level: 85, color: 'bg-purple-600/20 border-purple-600/40', icon: '🅱️' },
    ]
  },
  // Backend & Database ⭐ CERTS
  {
    category: 'Backend & DB',
    skills: [
      { name: '.NET Framework / Core', level: 96, color: 'bg-blue-500/20 border-blue-500/40', icon: '🔧' },
      { name: 'Node.js', level: 90, color: 'bg-green-500/20 border-green-500/40', icon: '🟢' },
      { name: 'SQL / MySQL', level: 93, color: 'bg-cyan-500/20 border-cyan-500/40', icon: '🗄️' },
      { name: 'Supabase / Firebase', level: 91, color: 'bg-pink-500/20 border-pink-500/40', icon: '☁️' },
    ]
  },
  // Enterprise ⭐ CERTS EVIDENZIATE
  {
    category: 'Enterprise',
    skills: [
      { name: 'MuleSoft', level: 97, color: 'bg-orange-500/20 border-orange-500/40', icon: '🔗' },
      { name: 'Salesforce Commerce Cloud', level: 95, color: 'bg-blue-600/20 border-blue-600/40', icon: '🛒', cert: true },
    ]
  },
  // DevOps & Tools
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Git / GitHub / BitBucket', level: 96, color: 'bg-gray-800/20 border-gray-800/40', icon: '📦' },
      { name: 'Azure DevOps', level: 90, color: 'bg-blue-400/20 border-blue-400/40', icon: '☁️' },
      { name: 'Atlassian (Jira/Confluence)', level: 88, color: 'bg-blue-700/20 border-blue-700/40', icon: '📋' },
    ]
  }
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Header title='Full-Stack Skills' subTitle='**20+ tecnologie**<br/>Certificazione Salesforce Commerce Cloud Developer 1.<br/>Backend .NET/C#, frontend React/Next.js, integrazioni scalabili.' />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillsData.map((group, idx) => (
            <div
              key={group.category}
              className={`space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 p-6 rounded-2xl border border-border/30 hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500 ${idx === 0 ? 'duration-200' :
                idx === 1 ? 'duration-400' :
                  idx === 2 ? 'duration-600' :
                    idx === 3 ? 'duration-800' : 'duration-1000'
                }`}
            >
              {/* Categoria */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                <h3 className="text-xl font-bold text-foreground">{group.category}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {group.skills.sort((a, b) => b.level - a.level).map((skill, sIdx) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 font-semibold text-foreground">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-1">
                        {skill.cert && (
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-500/40 px-2.5 py-1 font-semibold shadow-md">
                            Developer 1 Cert
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs px-2.5 py-1">
                          {skill.level}%
                        </Badge>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-muted/50 rounded-full h-2.5 group-hover:h-3 transition-all duration-500 overflow-hidden shadow-sm">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-md ${skill.color} transition-all duration-700`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Progetti */}
        <div className="text-center mb-24 animate-in fade-in-70 duration-1000">
          <Button size="lg" asChild className="group gap-3 text-xl px-12 py-8 shadow-2xl">
            <Link href="/projects">
              Progetti con Queste Skills
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
