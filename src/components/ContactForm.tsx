"use client";

import { useState } from "react";
import { company, services } from "@/data/site";
import Icon from "./Icon";

type Status = "idle" | "error" | "ready";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const org = String(data.get("organization") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }

    const subject = `Website enquiry${interest ? ` — ${interest}` : ""}${org ? ` (${org})` : ""}`;
    const lines: string[] = [`Name: ${name}`, `Email: ${email}`];
    if (phone) lines.push(`Phone: ${phone}`);
    if (org) lines.push(`Organization: ${org}`);
    if (interest) lines.push(`Interested in: ${interest}`);
    lines.push("", message);
    const body = lines.join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("ready");
    e.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className={`field ${errors.name ? "has-error" : ""}`}>
          <label htmlFor="cf-name">Full name *</label>
          <input id="cf-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} />
          {errors.name && <p id="cf-name-err" className="field__error">{errors.name}</p>}
        </div>
        <div className={`field ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="cf-email">Email *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} />
          {errors.email && <p id="cf-email-err" className="field__error">{errors.email}</p>}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-org">Organization</label>
          <input id="cf-org" name="organization" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-interest">I&apos;m interested in</label>
        <select id="cf-interest" name="interest" defaultValue="">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </div>
      <div className={`field ${errors.message ? "has-error" : ""}`}>
        <label htmlFor="cf-message">How can we help? *</label>
        <textarea id="cf-message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} />
        {errors.message && <p id="cf-message-err" className="field__error">{errors.message}</p>}
      </div>
      <button type="submit" className="btn btn--primary btn--block">
        Send message
        <Icon name="arrow" size={18} />
      </button>
      <p className="contact-form__note" role="status">
        {status === "ready"
          ? "Your email app should open with the message ready to send. If it doesn't, write to info@ahadubit.com."
          : "Submitting opens your email app with your message addressed to our team."}
      </p>
    </form>
  );
}
