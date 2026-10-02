export const SITE_URL = "https://portfolio.simonemarano.com";
export const PERSON_ID = `${SITE_URL}/#person`;

// Next replaces (not merges) openGraph per page: spread this to keep shared fields.
export const baseOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: "Simone Marano - Full-Stack Developer",
} as const;
