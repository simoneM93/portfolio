import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { getProfile } from '@/server/queries/profile';

import type { Profile } from '@/server/schema/profile';
import Experience from '@/components/experiences/Experience';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Metadata } from 'next';
import { getContact } from '@/server/queries/contact';
import type { Contact } from '@/server/schema/contact';
import { baseOpenGraph, PERSON_ID, SITE_URL } from '@/lib/seo';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Simone Marano - Full-Stack Developer",
  description:
    "Simone Marano, Full-Stack Developer specialized in Next.js, TypeScript and .NET Core. Portfolio of projects, skills and certifications.",
  alternates: {
    canonical: "https://portfolio.simonemarano.com",
  },
  openGraph: {
    ...baseOpenGraph,
    url: SITE_URL,
    title: "Simone Marano - Full-Stack Developer | Portfolio",
    description:
      "Next.js, TypeScript, .NET Core, MuleSoft. Enterprise projects and scalable applications.",
  },
};

export default async function Hero() {
  const [profile, contact]: [Profile, Contact] = await Promise.all([getProfile(), getContact()]);
  const profileImage = profile.image_url ?? `${SITE_URL}/profile.jpg`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "mainEntity": {
              "@type": "Person",
              "@id": PERSON_ID,
              "name": `${profile.name} ${profile.surname}`,
              "url": SITE_URL,
              "jobTitle": "Full-Stack Developer",
              "description": "Full-Stack Developer specialized in Next.js, TypeScript, .NET Core, MuleSoft and Salesforce Commerce Cloud.",
              "image": profileImage,
              "email": `mailto:${contact.email}`,
              "sameAs": [
                contact.linkedin_url,
                `https://github.com/${process.env.GITHUB_USERNAME}`,
                contact.instagram_url,
                contact.facebook_url,
              ].filter(Boolean),
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Catania",
                "addressRegion": "Sicily",
                "addressCountry": "IT"
              },
              "knowsAbout": [
                "Next.js", "TypeScript", "React", ".NET Core", "C#",
                "MuleSoft", "Salesforce Commerce Cloud", "PostgreSQL"
              ]
            }
          })
        }}
      />
      <section
        id="main-content"
        className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-background text-foreground scroll-mt-14"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="space-y-6 md:text-left animate-in fade-in-50 duration-1000">
            <p className="text-sm font-medium text-primary tracking-[0.25em] uppercase">
              Hi, I&apos;m
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

          {/* Single image: circle above the text on mobile, framed portrait on the right on desktop */}
          <div className="order-first md:order-last flex justify-center md:justify-end">
            <div className="group relative w-40 md:w-full md:max-w-sm aspect-square md:aspect-4/5 animate-in fade-in-50 zoom-in-95 duration-1000">
              <div
                aria-hidden
                className="hidden md:block absolute inset-0 rounded-3xl border-2 border-foreground/15 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none"
              />
              <div className="relative h-full w-full overflow-hidden rounded-full md:rounded-3xl ring-1 ring-border bg-muted shadow-xl">
                <Image
                  src={profile.image_url ?? '/profile.jpg'}
                  alt={`${profile.name} ${profile.surname} - Full-Stack Developer`}
                  fill
                  sizes="(min-width: 768px) 384px, 160px"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <p className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:-left-6 md:bottom-8 md:translate-x-0 flex items-center gap-2 whitespace-nowrap rounded-full border bg-background/90 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium shadow-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
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
