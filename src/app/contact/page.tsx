import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { company } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to Ahadubit Technologies in Addis Ababa. Call +251 911 095 346 or email info@ahadubit.com.",
};

export default function ContactPage() {
  const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Let's talk about your next system."
        intro="Tell us what you need — an ERP rollout, a custom app, a surveillance network or something new. Your message goes straight to our team."
      />

      <section className="section section--tight-top">
        <div className="container contact">
          <div className="contact__form" data-reveal="up">
            <h2 className="contact__title">Send a message</h2>
            <p className="contact__sub">Fields marked * are required.</p>
            <ContactForm />
          </div>

          <aside className="contact__info" aria-label="Contact details">
            <ul className="contact-list" data-stagger>
              <li data-reveal="left">
                <span className="contact-list__icon" aria-hidden="true">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <h3>Phone</h3>
                  {company.phones.map((p) => (
                    <a key={p} href={tel(p)}>
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li data-reveal="left">
                <span className="contact-list__icon" aria-hidden="true">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </li>
              <li data-reveal="left">
                <span className="contact-list__icon" aria-hidden="true">
                  <Icon name="pin" size={20} />
                </span>
                <div>
                  <h3>Office</h3>
                  <p>
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.city}
                  </p>
                </div>
              </li>
            </ul>
            <div data-reveal="up">
              <MapEmbed query={company.mapQuery} label="AB Star Building, Megenagna, Addis Ababa" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
