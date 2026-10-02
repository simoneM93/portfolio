---
name: Recurring Issues
description: Repeated accessibility and UX anti-patterns found across the portfolio codebase
type: project
---

Patterns observed consistently during initial full-codebase review (April 2026):

**Why:** Documented after first comprehensive review to avoid re-discovering the same issues in future targeted reviews.

**How to apply:** When reviewing individual components, flag these if still present; note when they have been resolved.

## Accessibility
- Icon-only interactive elements missing aria-label (e.g. FaGithub in RepoCard, close button ✕ in PdfIframeModal, social cards on contact page)
- Emoji used inline as content without aria-hidden (🏆, 📅, 🔍, 📄, ✕) — screen readers announce them literally
- Progress bars in skills page are plain `<div>` elements with no ARIA role, aria-valuenow, aria-valuemin, aria-valuemax
- External links missing visible indication beyond context (rel="noopener noreferrer" is present but no aria-label describing destination)
- Focus ring suppressed globally via `focus:outline-none` on ScrollToTopButton
- No skip-to-main-content link anywhere in the layout
- Missing `lang` attribute specificity — layout sets `lang="en"` but content has Italian strings (e.g. "Chiudi" close button, Italian comments)

## Navigation / Wayfinding
- No persistent navigation bar — users on inner pages navigate back only via Header back-link or browser back button
- No active-state indication for current page in any nav element
- Breadcrumb or page indicator completely absent

## Content / Copy
- Typo: directory named `expiriences` (should be `experiences`) — surfaces in import paths
- "Social & Messaging" card title uses a Gmail icon (BiLogoGmail) instead of a generic social/messaging icon — semantically misleading
- "GitHub Overview" sidebar card shows only repo count — labeled "Activity summary" but contains no actual activity data
- Close button in PDF modal reads "Chiudi" (Italian) while all other UI is in English — language inconsistency
- Skills page Header subTitle is an empty string — the section intro is missing for the skills grid

## Visual / Design
- Three CTA buttons on hero stack vertically on mobile with no visual priority distinction beyond variant — the primary action gets lost
- `duration-400`, `duration-600`, `duration-800`, `duration-1000` Tailwind classes used on skill cards but these are non-standard Tailwind durations (only 75/100/150/200/300/500/700/1000 are built-in) — animations may not work
- Stagger animation via `delay-${idx * 100}` string interpolation on certification cards — Tailwind JIT cannot purge dynamic class names, delays will not apply
- Profile image hidden on mobile (`hidden md:flex`) — mobile visitors never see the photo
- `bg-linear-to-r` appears to be a non-standard Tailwind v4 utility (should be `bg-gradient-to-r`) — verify gradient renders correctly
