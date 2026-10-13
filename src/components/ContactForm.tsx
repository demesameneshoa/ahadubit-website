"use client";

import { useState } from "react";
import { company, services } from "@/data/site";
import Icon from "./Icon";

type Status = "idle" | "sending" | "sent" | "failed";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const payload = {
      name: get("name"),
      email: get("email"),
      organization: get("organization"),
      phone: get("phone"),
      interest: get("interest"),
      message: get("message"),
      website: get("website"), // honeypot
    };

    const next: Record<string, string> = {};
    if (!payload.name) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) next.email = "Enter an email address like name@example.com.";
    if (payload.message.length < 10) next.message = "Describe what you need in at least 10 characters.";
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: { ok?: boolean; error?: string; errors?: Record<string, string> } = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerError(json.error || `Unable to send your message right now. Try again, or email ${company.email}.`);
      setStatus("failed");
    } catch {
      setServerError(`Unable to connect. Check your internet connection and try again, or email ${company.email}.`);
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form__success" role="status">
        <span className="contact-form__success-icon" aria-hidden="true">
          <Icon name="check" size={28} strokeWidth={2.4} />
        </span>
        <h3>Message sent</h3>
        <p>Thank you. Our team will reply to the email address you provided. For anything urgent, call {company.phones[0]}.</p>
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-busy={sending}>
      {/* Honeypot field: hidden from people, tempting for spam bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field-row">
        <div className={`field ${errors.name ? "has-error" : ""}`}>
          <label htmlFor="cf-name">Full name *</label>
          <input id="cf-name" name="name" autoComplete="name" placeholder="Abebe Kebede" aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} />
          {errors.name && <p id="cf-name-err" className="field__error">{errors.name}</p>}
        </div>
        <div className={`field ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="cf-email">Email *</label>
          <input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} />
          {errors.email && <p id="cf-email-err" className="field__error">{errors.email}</p>}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-org">Organization</label>
          <input id="cf-org" name="organization" autoComplete="organization" placeholder="Company or agency" />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+251 9XX XXX XXX" />
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
        <textarea id="cf-message" name="message" rows={5} placeholder="For example: an ERP for our factory covering purchase, inventory and sales." aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined} />
        {errors.message && <p id="cf-message-err" className="field__error">{errors.message}</p>}
      </div>
      <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
        {sending ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Icon name="arrow" size={18} />
          </>
        )}
      </button>
      <p className={`contact-form__note ${serverError ? "is-error" : ""}`} role={serverError ? "alert" : "status"}>
        {serverError || `Your message goes straight to our team at ${company.email}.`}
      </p>
    </form>
  );
}
