---
name: Project - Portfolio SEO State (April 2026)
description: Current SEO configuration, known gaps, and priorities for portfolio.simonemarano.com — full file-level audit completed 2026-04-20
type: project
---

Full SEO audit completed 2026-04-20 by reading all source files.

**Why:** Simone wants to maximize organic visibility for his developer portfolio, targeting Italian local and international remote markets.

---

## Site Architecture
- Next.js 16 App Router, 4 routes: /, /projects, /skills, /contact
- All pages use ISR (revalidate 86400 for /, /projects; 3600 for /skills, /contact)
- Deployed on Vercel, domain: https://portfolio.simonemarano.com
- No web manifest file found in /public

## CRITICAL GAPS

1. **Zero JSON-LD structured data** — no Person, WebSite, ProfilePage, BreadcrumbList, or ItemList anywhere in the codebase
2. **OG image is profile.jpg** — a portrait photo at wrong aspect ratio; no dedicated 1200x630 social card exists; no opengraph-image.tsx file
3. **lang="en" on <html>** but OG locale is it_IT and content mixes Italian/English — contradictory language signals to Google
4. **Duplicate Google verification** — one token in metadata.verification.google AND one hardcoded <meta> tag in layout.tsx <head>; produces two identical meta tags in the rendered HTML
5. **No Twitter/X Card metadata** — no twitter: namespace tags at all; social shares on X will be degraded
6. **No canonical tags** on any page — Next.js App Router does not auto-generate canonicals from metadataBase alone without explicit alternates.canonical
7. **Title template produces redundant branding** — e.g. "Projects - Simone Marano Full-Stack Developer | Simone Marano Portfolio" (71 chars, over 60 limit, "Simone Marano" appears twice)
8. **Skills page has no H1 keywords** — H1 text is just "Skills" (rendered by Header component), "Certifications" is rendered as H1 also by a second Header call — two H1s on one page

## MEDIUM GAPS

9. Sitemap uses `new Date()` for all lastModified — always returns current timestamp, unreliable signal for crawl budget
10. /projects changeFrequency "monthly" contradicts revalidate=86400 (daily GitHub fetch) — should be "weekly" or "daily"
11. /projects meta description is 66 chars — very thin, misses all keywords
12. /skills meta description lists technologies but does not mention certifications or proficiency context
13. Skills page renders TWO H1 elements (Header component always renders <h1>) — invalid document outline
14. No internal navigation between /skills and /projects (no cross-links in content)
15. No contact form — contact page is contact info display only; reduces engagement and conversion signals
16. Experience section (homepage) uses H2 "Experience & Education" and H3 for job titles — correct hierarchy, but job titles/orgs are loaded from DB so not keyword-enriched statically
17. RepoCard renders repo name as CardTitle (not a heading element) — project names are not in heading tags, reducing topical signal
18. No web app manifest / theme-color meta tag

## QUICK WINS

19. Add twitter card meta to layout.tsx (5 lines)
20. Add alternates.canonical to each page metadata
21. Remove the hardcoded <meta> GSC tag from layout.tsx <head> (already in metadata.verification)
22. Expand /projects and /contact meta descriptions to 150-160 chars
23. Fix title template to avoid "Simone Marano" appearing twice
24. Add rel="me" link to LinkedIn in layout for identity verification

## How to apply
Priority order: (1) JSON-LD Person+WebSite schema on home, (2) OG image fix, (3) duplicate GSC tag, (4) Twitter Card, (5) canonical tags, (6) heading structure on /skills, (7) title template fix, (8) description expansions, (9) sitemap lastModified, (10) BreadcrumbList on inner pages.
