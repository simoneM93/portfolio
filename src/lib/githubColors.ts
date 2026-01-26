const COLORS_URL = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";

export async function getLanguageColor(lang: string): Promise<string> {
    try {
        const res = await fetch(COLORS_URL);
        const colors: Record<string, string> = await res.json();

        return colors[lang] || "#ebedf0";
    } catch {
        return "#ebedf0";
    }
}