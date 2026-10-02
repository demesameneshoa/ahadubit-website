# Ahadubit Technologies — Corporate Website

Multi-page corporate website for **Ahadubit Technologies PLC** (*Solutions for Tomorrow*), built with **Next.js 15 (App Router)**, React 19 and TypeScript. Ready to deploy on **Vercel**.

## Pages

| Route        | Content |
|--------------|---------|
| `/`          | Hero with animated service orbit, stats, intro, services, why-us, featured work, client marquee, CTA |
| `/about`     | Story, mission & philosophy, who we serve, key features |
| `/services`  | Eight service lines with sticky index and an animated delivery-process timeline |
| `/portfolio` | Twelve client projects with category filters and live/completed status |
| `/contact`   | Phone, email, address, map and a validated enquiry form |

## Interactions

- Scroll-reveal animations (fade / slide / scale with stagger), animated counters, parallax wave backgrounds
- Header that turns solid on scroll, with a page-progress bar and a full-screen mobile menu
- Pointer "spotlight" hover on cards, orbiting service chips, an infinite client-logo marquee
- Respects `prefers-reduced-motion`; content stays visible without JavaScript

All animation is plain CSS plus a small framework-free script (`src/lib/scroll-effects.ts`) — no animation libraries.

## Editing content

All company content lives in **`src/data/site.ts`** — contact details, services, key features, projects and the process steps. Edit that file and the pages update.

Brand assets are in `public/brand/` (logo, white-text logo for dark backgrounds, icon mark). Client logos are in `public/clients/`. The favicon is `src/app/icon.png`.

## Contact form

The form validates input and opens the visitor's email app with the message addressed to `info@ahadubit.com`. To receive submissions directly instead, connect a form service (e.g. Formspree, Resend) in `src/components/ContactForm.tsx`.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy on Vercel

1. Go to <https://vercel.com/new> and import this GitHub repository.
2. Framework preset: **Next.js** (auto-detected). No environment variables needed.
3. Click **Deploy**. Every push to `main` redeploys automatically.
4. To use `ahadubit.com`, add the domain under *Project → Settings → Domains* and update your DNS records as Vercel instructs.
