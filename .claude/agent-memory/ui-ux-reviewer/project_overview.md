---
name: Project Overview
description: Stack, design system, pages, and key context for Simone Marano's dark-mode portfolio
type: project
---

Dark-mode personal portfolio for Simone Marano, Full-Stack Developer based in Catania, Sicily. Targeting recruiters and potential clients for enterprise full-stack work (Next.js, .NET Core, MuleSoft, Salesforce Commerce Cloud).

**Why:** Professional portfolio to showcase skills, experience, and certifications and attract remote work opportunities.

**How to apply:** Reviews should reflect the professional context — impressions on recruiters/clients matter enormously. Prioritize first-impression issues (hero, navigation, accessibility) over micro-polish.

## Stack
- Framework: Next.js App Router (v16), React 19
- Styling: Tailwind CSS 4 + shadcn/ui (New York style, Zinc base, dark mode by default via `<html class="dark">`)
- Fonts: Geist Sans + Geist Mono (Google Fonts)
- Icons: react-icons (fa, fa6, si, tb, ri, io, io5, vsc, ai), Lucide React
- Animations: tw-animate-css (animate-in, fade-in, slide-in-from-bottom, zoom-in)
- DB: PostgreSQL/Neon + Drizzle ORM
- Analytics: Vercel Analytics

## Pages
- `/` — Hero (profile photo, name, CTA buttons, tech stack badges) + Experience/Education timeline
- `/projects` — GitHub repo cards with language breakdown + sidebar overview card
- `/skills` — Skill categories with progress bars + certification badges with PDF viewer modal
- `/contact` — Direct contact info card + social media cards

## Design Conventions Observed
- Zinc-based dark palette via shadcn/ui CSS custom properties (oklch)
- Primary: near-white zinc (oklch 0.92) — used for text gradients, borders, highlights
- Secondary: dark zinc (oklch 0.274) — used as muted fill
- All headings in gradient: `bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent`
- `animate-in fade-in-*` entrance animations on most sections
- Cards use `border-border/50 shadow-xl` consistently
- CTA buttons use shadcn Button with size="lg"
- No site-wide navigation bar present — navigation via back-to-home Link in Header component
- ScrollToTopButton fixed bottom-right on all inner pages and home
- PDF viewer uses Google Docs embed (iframe) via a Zustand modal
- Certifications use emoji (🏆 📅 🔍 📄) as decorative elements throughout
