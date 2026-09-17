# Getahun Guadie Mamo — Portfolio

A dark, signal/network-themed portfolio built with Next.js 16 (App Router,
Turbopack), React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

- **Your info**: edit the content arrays/text directly in each file under
  `components/` (`Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`,
  `Skills.tsx`, `Contact.tsx`).
- **Resume**: `public/resume.pdf` is already in place — the nav and hero
  "Download résumé" buttons link straight to it with a forced download, so
  a recruiter clicking either gets the actual PDF file, not just a page.
  To update it, replace `public/resume.pdf` with a new export of the same
  name.
- **Photo**: `public/avatar.jpg`, shown in the hero.
- **Colors/fonts**: design tokens live in `app/globals.css` inside the
  `@theme` block (Tailwind v4's CSS-first config — no `tailwind.config.ts`
  needed) and `app/layout.tsx` (fonts, via `next/font/google`).
- **Metadata/SEO**: update the `metadata` export in `app/layout.tsx`.

## Deploy

The fastest path is [Vercel](https://vercel.com/new) — connect the repo (or
run `npx vercel`) and it deploys with zero config. Netlify and Cloudflare
Pages also work with their standard Next.js build settings.

## Stack

- Next.js 16 (App Router, Turbopack, TypeScript)
- React 19
- Tailwind CSS v4 (custom theme defined via `@theme` in `app/globals.css`)
- Framer Motion (the hero's entrance sequence, respects `prefers-reduced-motion`)
- lucide-react (icons)
