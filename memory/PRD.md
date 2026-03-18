# Ankit Anand — Luxury Portfolio PRD

## Project Overview
A senior Data Scientist's portfolio website redesigned from a cluttered cyberpunk aesthetic to an elegant, luxurious professional portfolio.

**URL:** https://1c21deed-9ef4-4a43-9890-e2a96289b33b.preview.emergentagent.com  
**Tech Stack:** React 18, TypeScript, Tailwind CSS, React Router v6, Framer Motion (available), Lucide React  
**Architecture:** Single-page app at `/app`, served via supervisor on port 3000

---

## User Persona
**Ankit Anand** — Senior Data Scientist (6+ years)  
**Audience:** Hiring managers, recruiters, tech leads, potential collaborators

---

## Core Requirements (Static)

### Design Language
- **Theme:** Deep Obsidian Dark (#050505 bg) with gold accent (#D4AF37)
- **Typography:** Playfair Display (headings), Manrope (body), JetBrains Mono (code)
- **Removed:** Cyberpunk glitch effects, particle explosions, scan lines, rainbow colors
- **Added:** Gold ring on profile photo, subtle radial gradients, glassmorphism cards, gold hover borders, smooth reveal animations

### Pages (All Retained)
1. **Home** — Hero + Stats + Current Highlights + Core Expertise + Portfolio Nav + Featured Work + CTA
2. **About** — Biography/Current Focus/Education tabs + Interactive Skills Radar chart
3. **Experience** — Career Overview/Professional Journey/Technology Stack tabs with gold timeline
4. **Projects** — Stats + Filter + Search + Project grid cards + Detail modal
5. **Contact** — Contact Info tab + Send Message form with validation

---

## What's Been Implemented

### 2025-03-18 — Full Luxury Redesign
- **`tailwind.config.js`** — Added luxury color palette (obsidian, gold), Playfair Display + Manrope + JetBrains Mono fonts, refined animations
- **`src/index.css`** — Google Fonts import (Playfair Display, Manrope, JetBrains Mono)
- **`src/styles/globals.css`** — Complete rewrite: clean luxury utilities, gold shimmer text, glass card, gold line animation, noise overlay, scrollbar styling
- **`Header.tsx`** — Transparent → frosted glass on scroll, Playfair logo, gold underline on active nav, clean theme toggle
- **`FloatingProfilePhoto.tsx`** — Gold gradient ring border, subtle hover glow, "AA" fallback monogram, availability indicator
- **`Hero.tsx`** — Full rewrite: large Playfair Display name with gold gradient "Anand", smooth CSS role rotation, clean CTAs, stats row, scroll cue
- **`HomePage.tsx`** — Stats strip, Current Highlights cards, Core Expertise cards, Portfolio Navigation, Featured Work section, CTA section — all without any cyberpunk elements
- **`About.tsx`** — Complete rewrite: Bio/Focus/Education tabs, interactive SVG Skills Radar (click points for details), contact info, current role card
- **`Experience.tsx`** — Career Overview/Journey/Tech tabs, gold center timeline line, expandable job detail cards
- **`Projects.tsx`** — Stats header, category filters, search, 3-column project cards with metrics, project detail modal
- **`Contact.tsx`** — Minimal underline-style form, contact methods, inquiry type chips, validation, mocked success state
- **Page files** — AboutPage, ExperiencePage, ProjectsPage, ContactPage — all updated with dark background + breadcrumb navigation
- **`ScrollProgressIndicator.tsx`** — Updated to gold (#D4AF37)
- **`useTheme.ts`** — Defaults to dark mode
- **App.tsx** — Deep obsidian base background

---

## Prioritized Backlog

### P0 — Done
- [x] Remove all cyberpunk/glitch/particle elements
- [x] Implement luxury color palette and typography
- [x] Redesign all 5 pages
- [x] Smooth scroll reveal animations
- [x] Interactive skills radar
- [x] Project modal
- [x] Contact form with validation

### P1 — Next
- [ ] Resume download (PDF upload + actual download link)
- [ ] Actual email sending for contact form (EmailJS integration)
- [ ] Light theme refinement (gold works better on dark, light needs different accent)
- [ ] Mobile responsiveness audit

### P2 — Future
- [ ] Blog section (route commented out in App.tsx)
- [ ] AI Labs section (route commented out in App.tsx)
- [ ] Creative section (route commented out in App.tsx)
- [ ] Project filtering persistence in URL
- [ ] Analytics integration (Vercel Analytics or similar)
- [ ] SEO meta tags

---

## Architecture Notes
- Frontend runs via supervisor on port 3000, directory `/app/frontend` (proxy package.json at `/app/frontend/package.json`, actual source at `/app`)
- `/app/frontend/package.json` contains start script that runs `cd /app && yarn start`
- Contact form is MOCKED — shows success after 1.5s delay, no actual email is sent
