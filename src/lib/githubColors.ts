const COLORS_URL = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";

type LanguageData = Record<string, { color: string; url: string }>;

let cachedLanguages: LanguageData | null = null;
let cacheExpiry = 0;

export async function getLanguageColor(lang: string): Promise<string> {
  if (cachedLanguages && Date.now() < cacheExpiry) {
    return cachedLanguages[lang]?.color ?? "#ebedf0";
  }

  try {
    const res = await fetch(COLORS_URL);
    cachedLanguages = await res.json() as LanguageData;
    cacheExpiry = Date.now() + 86400000;
    
    return cachedLanguages[lang]?.color ?? "#ebedf0";
  } catch {
    return "#ebedf0";
  }
}