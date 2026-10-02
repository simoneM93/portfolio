import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Mail, Share2 } from "lucide-react";
import CopyButton from "@/components/CopyButton";

import Header from "@/components/Header";
import type { Contact } from "@/server/schema/contact";
import { getContact } from "@/server/queries/contact";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Metadata } from "next";
import { baseOpenGraph, PERSON_ID, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Simone Marano — Full-Stack Developer available for remote work. Specialized in Next.js, TypeScript, .NET Core and MuleSoft integrations. Based in Catania, Sicily.",
  alternates: {
    canonical: "https://portfolio.simonemarano.com/contact",
  },
  openGraph: {
    ...baseOpenGraph,
    url: `${SITE_URL}/contact`,
    title: "Contact | Simone Marano - Full-Stack Developer",
    description: "Hire Simone Marano for enterprise full-stack development.",
  },
};

export default async function ContactPage() {
  const contact: Contact = await getContact();

  const socials = [
    { href: contact.linkedin_url, label: "LinkedIn", Icon: FaLinkedin, color: "text-sky-400" },
    { href: `https://github.com/${process.env.GITHUB_USERNAME}`, label: "GitHub", Icon: FaGithub, color: "text-foreground" },
    { href: contact.whatsapp_url, label: "WhatsApp", Icon: FaWhatsapp, color: "text-emerald-400" },
    { href: contact.telegram_url, label: "Telegram", Icon: FaTelegram, color: "text-sky-400" },
  ];

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
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://portfolio.simonemarano.com/contact" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "url": `${SITE_URL}/contact`,
            "mainEntity": { "@id": PERSON_ID },
          })
        }}
      />
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Header
          title="Contact Me"
          subTitle={
            <>
              Expert <strong>.NET</strong> | <strong>Salesforce</strong> | <strong>MuleSoft</strong> | <strong>React/Next.js</strong>.
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="w-full border-border animate-in fade-in-50 duration-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Mail className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                Direct Contact
              </CardTitle>
              <CardDescription>
                Reach me by email or phone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <BiLogoGmail className="h-6 w-6 text-red-400" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-muted-foreground hover:text-foreground hover:underline font-medium break-all"
                  >
                    {contact.email}
                  </a>
                </div>
                <CopyButton value={contact.email} label="Copy email address" />
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">Phone</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-muted-foreground hover:text-foreground hover:underline font-medium"
                  >
                    {contact.phone}
                  </a>
                </div>
                <CopyButton value={contact.phone} label="Copy phone number" />
              </div>
            </CardContent>
          </Card>

          <Card className="w-full border-border animate-in fade-in-70 duration-1000">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Share2 className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                Profiles & Messaging
              </CardTitle>
              <CardDescription>
                Find my work or message me directly
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {socials.map(({ href, label, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label} (opens in new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-muted/50 border border-border hover:border-foreground/30 hover:bg-muted transition-colors flex flex-col items-center gap-3"
                >
                  <Icon className={`h-9 w-9 ${color} group-hover:scale-110 transition-transform motion-reduce:transition-none`} aria-hidden="true" />
                  <span className="font-semibold text-sm text-foreground">{label}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
