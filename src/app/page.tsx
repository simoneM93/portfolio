import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { getProfile } from '@/server/queries/profile';

import type { Profile } from '@/server/schema/profile';
import Experience from '@/components/expiriences/Experience';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export const revalidate = 86400;

export default async function Hero() {
  const profile: Profile = await getProfile();

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-background text-foreground scroll-mt-20"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center max-w-6xl">
          <div className="space-y-6 md:text-left animate-in fade-in-50 duration-1000">
            <p className="text-sm font-medium text-primary tracking-[0.25em] uppercase">
              Hi, I'm
            </p>

            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent leading-tight">
              {profile.name} {profile.surname}
              <br />
              <span className="text-2xl md:text-4xl md:block font-normal text-muted-foreground">
                Full-Stack Developer
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Full-stack developer passionate about <strong>Next.js</strong>,{' '}
              <strong>TypeScript</strong> and <strong>.NET Core</strong>. I build
              scalable applications and backend integrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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

            <div className="flex flex-wrap gap-2 pt-4 text-sm">
              <span className="px-3 py-1.5 rounded-full border bg-card/40">
                .NET Core
              </span>
              <span className="px-3 py-1.5 rounded-full border bg-card/40">C#</span>
              <span className="px-3 py-1.5 rounded-full border bg-card/40">
                Salesforce Commerce Cloud
              </span>
              <span className="px-3 py-1.5 rounded-full border bg-card/40">
                MuleSoft
              </span>
              <span className="px-3 py-1.5 rounded-full border bg-card/40">
                React / Next.js
              </span>
            </div>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="relative w-96 h-96 group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl" />
              <div className="relative w-full h-full bg-linear-to-br from-card to-muted/30 rounded-3xl flex flex-col items-center justify-center border-2 border-border/50 overflow-hidden">
                <div className="w-72 h-72 rounded-2xl overflow-hidden relative">
                  <Image
                    src={profile.image_url ?? ''}
                    alt={`${profile.name} ${profile.surname}`}
                    width={288}
                    height={288}
                    priority
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Open to remote opportunities
                </p>
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator targetId="experience" />
      </section>
      <Experience />
      <ScrollToTopButton />
    </>
  );
}
