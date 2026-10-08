import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { company } from "@/data/site";

// Sends website enquiries straight to the company inbox.
//
// Configure in Vercel → Project → Settings → Environment Variables:
//   SMTP_HOST     your mail server's hostname, e.g. tonic.hostns.io (NOT the ns1/ns2 name servers)
//   SMTP_PORT     465 (SSL) or 587 (STARTTLS)          — default 465
//   SMTP_USER     the mailbox that sends, e.g. info@ahadubit.com
//   SMTP_PASS     that mailbox's password
//   CONTACT_TO    where enquiries go                    — default info@ahadubit.com
// Optional alternative to SMTP:
//   RESEND_API_KEY + RESEND_FROM (a sender on a domain verified in Resend)

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 120, email: 200, organization: 160, phone: 40, interest: 120, message: 5000 };
type Field = keyof typeof LIMITS;

// Best-effort rate limit per server instance: 5 messages / 10 minutes / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const data = {} as Record<Field, string>;
  for (const key of Object.keys(LIMITS) as Field[]) {
    const v = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    data[key] = v.slice(0, LIMITS[key]);
  }

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const to = process.env.CONTACT_TO || company.email;
  const subject = oneLine(`Website enquiry from ${data.name}${data.interest ? ` — ${data.interest}` : ""}`);
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Organization", data.organization],
    ["Interested in", data.interest],
  ].filter(([, v]) => v) as [string, string][];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}\n\n— Sent from the contact form on ahadubit.com`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#17162e">
<h2 style="color:#262262;margin:0 0 16px">New website enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5d5c77;padding-right:16px">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;border-left:3px solid #ef4b29;padding:8px 14px;background:#f4f6fb">${escapeHtml(data.message)}</p>
<p style="color:#5d5c77;font-size:13px">Reply to this email to respond to ${escapeHtml(data.name)} directly.</p></div>`;

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || `Ahadubit Website <${to}>`,
          to: [to],
          reply_to: data.email,
          subject,
          text,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    } else {
      const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error("Email is not configured (missing SMTP_* environment variables).");
      const port = Number(process.env.SMTP_PORT || 465);
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        // Fail fast with a clear error instead of hanging the visitor's request.
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
      });
      await transporter.sendMail({
        from: { name: "Ahadubit Website", address: SMTP_USER },
        to,
        replyTo: { name: oneLine(data.name), address: data.email },
        subject,
        text,
        html,
      });
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: `Sorry, your message couldn't be sent right now. Please email us at ${company.email}.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
