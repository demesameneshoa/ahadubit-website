# Ahadubit Technologies — Corporate Website

Multi-page corporate website for **Ahadubit Technologies PLC** (*Solutions for Tomorrow*), built with **Next.js 15 (App Router)**, React 19 and TypeScript. Ready to deploy on **Vercel**.

## Pages

| Route        | Content |
|--------------|---------|
| `/`          | Hero with the contour-line signature and client logos, services, selected work, why Ahadubit, call to action |
| `/about`     | Story and key facts, mission and philosophy, who we serve, what working with us looks like |
| `/services`  | Eight service lines with a sidebar index, and the five-step delivery process |
| `/portfolio` | Twelve client projects with a type filter and completed / in-progress status |
| `/contact`   | Enquiry form that emails info@ahadubit.com directly, phone, email, office and an on-demand map |

## Design principles

The design follows Apple's Human Interface Guidelines as they apply to the web (principles and foundations):

- **Brand from the company profile:** white ground, navy type, blue contour lines. Brand orange is reserved for primary buttons and "In progress" status.
- **One signature element:** the contour-line waves in the homepage hero, which settle in once on load. Nothing loops.
- **Light and dark appearance** follow the visitor's device setting (no toggle). Increased-contrast and reduced-transparency settings are honoured.
- **Accessible by measurement:** body text is at least 7:1 contrast in both appearances; controls are at least 44 px; layouts survive 200% text size; every page works by keyboard; motion is off when Reduce Motion is on.
- **Type:** Montserrat (the profile's typeface) for headlines; the device's system font for body text.

Colours are named tokens at the top of `src/app/globals.css`, with light and dark values side by side.

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
