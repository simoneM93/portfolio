import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

import Header from "@/components/Header";
import type { Contact } from "@/server/schema/contact";
import { getContact } from "@/server/queries/contact";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact - Simone Marano Full-Stack Developer",
  description:
    "Contact me for Next.js, .NET Core or MuleSoft integration projects. Available for remote work from Catania, Sicily.",
  openGraph: {
    title: "Contact Me | Simone Marano - Full-Stack Developer",
    description: "Hire Simone Marano for enterprise full-stack development.",
  },
};

export default async function ContactPage() {
  const contact: Contact = await getContact();

  return (
    <div className="min-h-screen py-24 px-4 bg-background">
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contatti Diretti */}
          <div className="space-y-8 animate-in fade-in-50 duration-700">
            <Card className="w-full h-fit border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FaPhoneAlt className="h-8 w-8 text-primary" />
                  Direct Contact
                </CardTitle>
                <CardDescription>
                  Reach me on email or chat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BiLogoGmail className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Telefono */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-all">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <FaPhoneAlt className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-emerald-500 hover:underline font-medium"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 animate-in fade-in-70 duration-1000">
            {/* Social Icons */}
            <Card className="w-full border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BiLogoGmail className="h-8 w-8 text-secondary" />
                  Social & Messaging
                </CardTitle>
                <CardDescription>
                  Contact me on social platforms too
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {/* LinkedIn */}
                <a
                  href={contact.linkedin_url}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="h-10 w-10 text-blue-700 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm text-foreground">
                    LinkedIn
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href={contact.whatsapp_url}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-10 w-10 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm text-foreground">
                    WhatsApp
                  </span>
                </a>

                {/* Telegram */}
                <a
                  href={contact.telegram_url}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="h-10 w-10 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm text-foreground">
                    Telegram
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href={contact.instagram_url}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-10 w-10 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm text-foreground">
                    Instagram
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href={contact.facebook_url}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-700/10 border border-blue-600/20 hover:border-blue-600/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm text-foreground">
                    Facebook
                  </span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
