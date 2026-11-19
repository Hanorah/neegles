import type { Metadata } from "next";
import ContactForm from "@/components/pages/ContactForm";
import { company } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Start a project with Neegles." };

export default function ContactPage() {
  return (
    <section className="contact" data-thread="0.85">
      <div className="contact-l">
        <p className="kicker">Contact</p>
        <h1 className="contact-title" data-split data-split-now>
          Tell us what you&apos;re <em className="serif">building.</em>
        </h1>
        <ul className="contact-ways" data-stagger>
          <li>
            <span>Email</span>
            <a href={`mailto:${company.email}`} data-magnetic>
              {company.email}
            </a>
          </li>
          <li>
            <span>WhatsApp</span>
            <a href={company.whatsapp} target="_blank" rel="noreferrer" data-magnetic>
              Message us ↗
            </a>
          </li>
          <li>
            <span>Social</span>
            <span className="contact-social">
              {company.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </span>
          </li>
        </ul>
      </div>
      <div className="contact-r" data-fade="0.4">
        <ContactForm />
      </div>
    </section>
  );
}
