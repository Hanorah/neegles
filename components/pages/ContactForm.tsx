"use client";

import { useState } from "react";
import { capabilities, company } from "@/lib/content";

/** Composes a ready-to-send email (no backend): name, company, what you need, and the brief. */
export default function ContactForm() {
  const [need, setNeed] = useState<string[]>([]);
  const toggle = (t: string) => setNeed((n) => (n.includes(t) ? n.filter((x) => x !== t) : [...n, t]));
  return (
    <form
      className="cform"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const subject = `Project enquiry from ${f.get("name") || "a new client"}${f.get("company") ? `, ${f.get("company")}` : ""}`;
        const body = [
          `Name: ${f.get("name")}`,
          `Email: ${f.get("email")}`,
          f.get("company") ? `Company: ${f.get("company")}` : "",
          need.length ? `Looking for: ${need.join(", ")}` : "",
          "",
          String(f.get("brief") || ""),
        ]
          .filter((l) => l !== "")
          .join("\n");
        window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <label className="cf">
        <span>Your name</span>
        <input name="name" required autoComplete="name" placeholder="Ada Obi" />
      </label>
      <label className="cf">
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="ada@company.com" />
      </label>
      <label className="cf cf-wide">
        <span>Company</span>
        <input name="company" autoComplete="organization" placeholder="Company name (optional)" />
      </label>
      <fieldset className="cf cf-wide">
        <legend>What do you need?</legend>
        <div className="cf-chips">
          {capabilities.map((c) => (
            <button type="button" key={c.id} className={need.includes(c.title) ? "is-on" : ""} aria-pressed={need.includes(c.title)} onClick={() => toggle(c.title)}>
              {c.title}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="cf cf-wide">
        <span>The brief</span>
        <textarea name="brief" rows={5} required placeholder="What does the business do, and what should the software change?" />
      </label>
      <button type="submit" className="pill pill-ink cf-send" data-magnetic>
        Send the brief <span aria-hidden="true">→</span>
      </button>
      <p className="cf-note">This opens your email app with everything filled in. Prefer WhatsApp? Use the link on the left.</p>
    </form>
  );
}
