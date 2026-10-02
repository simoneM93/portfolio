import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PdfModalProvider from "@/components/PdfModalProvider";
import { Analytics } from "@vercel/analytics/next"
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PERSON_ID, SITE_URL } from "@/lib/seo";

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
    locale: "en_US",
    url: "https://portfolio.simonemarano.com",
    siteName: "Simone Marano - Full-Stack Developer",
    title: "Simone Marano - Full-Stack Developer",
    description:
      "Portfolio of Simone Marano: Next.js, TypeScript, .NET Core, MuleSoft and enterprise integrations.",
  },
  // title/description omitted: Next falls back to each page's openGraph
  twitter: {
    card: "summary_large_image",
    creator: "@simonemarano",
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
    google: ["zgA5Hi3fJI0yUsD5XenxN853GX09P77T", "hJzt8VqUIiSJSkUy5E74p3GO53ah4WZMk3CSLLqy_w0"],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Simone Marano - Full-Stack Developer",
              "url": SITE_URL,
              "description": "Portfolio of Simone Marano, Full-Stack Developer from Catania, Sicily.",
              "author": { "@id": PERSON_ID },
            })
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <PdfModalProvider />
      </body>
    </html>
  );
}
