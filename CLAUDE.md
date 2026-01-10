# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Bradley Exton, a senior full-stack developer. The site serves as both a professional portfolio for job hunting and a freelance business presence. Positioning is "developer first, freelance services second."

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Fonts:** Inter (body) + Space Grotesk (headings) via next/font/google

## Architecture

### App Router Structure

```
src/app/
├── layout.tsx      # Root layout with fonts, metadata, global styles
├── page.tsx        # Homepage (client component with animations)
├── globals.css     # Tailwind imports + CSS custom properties
├── about/page.tsx  # About page (server component with metadata)
├── services/page.tsx # Services page (client component for FAQ accordion)
└── contact/        # Contact page (planned, not yet implemented)
```

### Components

Shared components in `src/components/`:
- `Header.tsx` - Fixed navigation with mobile hamburger menu (client component)
- `Footer.tsx` - Site footer with links (server component)

### Styling Conventions

- Brand colors defined as CSS custom properties in `globals.css` and exposed via Tailwind's `@theme inline`
- Primary color: Emerald (emerald-600 is the main brand color)
- Accent color: Amber (for secondary CTAs)
- Neutrals: Slate
- Headings use `font-[family-name:var(--font-space-grotesk)]`
- Path alias `@/*` maps to `./src/*`

### Page Patterns

- Pages use `Header` and `Footer` wrapper components
- Hero sections typically have gradient backgrounds (`from-emerald-50 via-white to-slate-50`)
- Section headings follow pattern: small uppercase label + large heading
- CTAs use emerald gradient backgrounds with white text

## Project Brief

Full design specifications, copy, and brand guidelines are in `bradleyexton-site-brief.md`. Reference this file for:
- Complete page copy and content
- Color palette values
- Design direction and aesthetic guidelines
- Planned features (Cal.com booking, contact form)
