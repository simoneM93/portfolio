const COLORS_URL = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";

export async function getLanguageColor(lang: string): Promise<string> {
  try {
    const res = await fetch(COLORS_URL);
    const languages: Record<string, { color: string; url: string }> = await res.json();

    const languageData = languages[lang];
    return languageData?.color || "#ebedf0";
  } catch {
    return "#ebedf0";
  }
}
