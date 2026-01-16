import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getProfile } from '@/server/queries/profile';

import type { Profile } from '@/server/schema/profile';

export const revalidate = 86400;

export default async function Hero() {
  const profile: Profile = await getProfile();
  
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-background text-foreground scroll-mt-20"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center max-w-6xl">
        {/* Colonna Testo */}
        <div className="space-y-6 md:text-left animate-in fade-in-50 duration-1000">
          {/* Intro */}
          <p className="text-sm font-medium text-primary tracking-[0.25em] uppercase animate-in slide-in-from-top-2 duration-700">
            Hi, I'm
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent leading-tight animate-in slide-in-from-bottom-2 duration-1000">
            {profile.name} {profile.surname}<br />
            <span className="text-2xl md:text-4xl md:block font-normal text-muted-foreground animate-in slide-in-from-bottom-4 duration-1200">
              Full-Stack Developer
            </span>
          </h1>

          {/* Descrizione */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-in slide-in-from-bottom-6 duration-1400">
            Full-stack developer passionate about <strong>Next.js</strong>, <strong>TypeScript</strong> and
            <strong> .Net Core</strong>. I build scalable applications and handle backend integrations.
          </p>


          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-1600">
            <Button size="lg" asChild>
              <Link href="/projects">Show My Projects</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/skills">Skills & Certifications</Link>
            </Button>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-4 text-sm">
            <span className="px-3 py-1.5 rounded-full border bg-card/40 hover:bg-primary/10">.NET Core</span>
            <span className="px-3 py-1.5 rounded-full border bg-card/40 hover:bg-primary/10">C#</span>
            <span className="px-3 py-1.5 rounded-full border bg-card/40 hover:bg-primary/10">Salesforce Commerce Cloud</span>
            <span className="px-3 py-1.5 rounded-full border bg-card/40 hover:bg-primary/10">MuleSoft</span>
            <span className="px-3 py-1.5 rounded-full border bg-card/40 hover:bg-primary/10">React/Next.js</span>
          </div>
        </div>

        {/* Colonna Immagine */}
        <div className="hidden md:flex justify-end animate-in fade-in-70 slide-in-from-right-10 duration-1500">
          <div className="relative w-96 h-96 group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl animate-pulse" />
            <div className="relative w-full h-full bg-linear-to-br from-card to-muted/30 rounded-3xl flex flex-col items-center justify-center border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
              {/* Avatar */}
              <div className="w-72 h-72 rounded-2xl overflow-hidden relative bg-linear-to-br from-muted to-card/50">
                {/* Placeholder professionale - sostituisci con tua foto */}
                {/* <Image
                  src="/api/placeholder/288/288?text=SM"
                  alt="Simone Marano"
                  width={288}
                  height={288}
                  priority
                  className="object-cover brightness-110 saturate-110"
                /> */}
              </div>
              {/* Status */}
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium group-hover:text-primary transition-colors">
                Available for remote work
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Link
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Scorri ai progetti"
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </Link>
    </section>
  );
}
