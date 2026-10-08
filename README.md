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

Enquiries are sent directly to **info@ahadubit.com** by the server route `src/app/api/contact/route.ts` (validation, spam honeypot and rate limiting included). Visitors just click **Send** — no email app opens. Replies go straight to the visitor because their address is set as *Reply-To*.

Set these in **Vercel → Project → Settings → Environment Variables**, then redeploy:

| Variable | Value |
|---|---|
| `SMTP_HOST` | `tonic.hostns.io` — the mail server hosting info@ahadubit.com. (Not `ns1.hostns.io`, which is a name server, and not `mail.ahadubit.com`, which now points at Vercel.) |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@ahadubit.com` |
| `SMTP_PASS` | the password of the info@ahadubit.com mailbox |
| `CONTACT_TO` | *(optional)* a different recipient, e.g. `sales@ahadubit.com` |

Alternatively set `RESEND_API_KEY` and `RESEND_FROM` to send through [Resend](https://resend.com) instead of SMTP.

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
