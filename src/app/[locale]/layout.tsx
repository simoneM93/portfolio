import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PdfModalProvider from "@/components/PdfModalProvider";
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.simonemarano.com"),
  title: {
    default: "Simone Marano - Full-Stack Developer | Next.js, TypeScript, .NET Core",
    template: "%s | Simone Marano Portfolio",
  },
  description: "Full-stack developer passionate about Next.js, TypeScript and .NET Core. I build scalable applications and backend integrations from Catania, Sicily.",
  keywords: [
    "Full Stack Developer",
    "Next.js developer",
    "TypeScript",
    ".NET Core",
    "MuleSoft",
    "Salesforce Commerce Cloud",
    "Simone Marano developer Catania",
    "remote developer Italy",
  ],
  authors: [{ name: "Simone Marano", url: "https://portfolio.simonemarano.com" }],
  creator: "Simone Marano",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://portfolio.simonemarano.com",
    siteName: "Simone Marano - Full-Stack Developer",
    title: "Simone Marano - Full-Stack Developer",
    description:
      "Portfolio of Simone Marano: Next.js, TypeScript, .NET Core, MuleSoft and enterprise integrations.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Simone Marano - Full-Stack Developer Portfolio",
      },
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "zgA5Hi3fJI0yUsD5XenxN853GX09P77T",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  }
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <meta name="google-site-verification" content="hJzt8VqUIiSJSkUy5E74p3GO53ah4WZMk3CSLLqy_w0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Analytics />
          <PdfModalProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
