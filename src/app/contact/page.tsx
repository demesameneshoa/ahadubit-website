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
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Connect with us"
        title={
          <>
            Let&apos;s talk about <span className="hl">your next system</span>.
          </>
        }
        intro="Tell us what you need — an ERP rollout, a custom app, a surveillance network or something new. We'll get back to you promptly."
      />

      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <ul className="contact-cards" data-stagger="90">
              <li data-reveal="up">
                <a className="contact-card" href={`tel:${company.phones[0].replace(/\s/g, "")}`} data-spotlight>
                  <span className="contact-card__icon">
                    <Icon name="phone" size={22} />
                  </span>
                  <span>
                    <span className="contact-card__label">Call us</span>
                    <span className="contact-card__value">{company.phones[0]}</span>
                  </span>
                </a>
              </li>
              <li data-reveal="up">
                <a className="contact-card" href={`tel:${company.phones[1].replace(/\s/g, "")}`} data-spotlight>
                  <span className="contact-card__icon">
                    <Icon name="phone" size={22} />
                  </span>
                  <span>
                    <span className="contact-card__label">Alternate line</span>
                    <span className="contact-card__value">{company.phones[1]}</span>
                  </span>
                </a>
              </li>
              <li data-reveal="up">
                <a className="contact-card" href={`mailto:${company.email}`} data-spotlight>
                  <span className="contact-card__icon">
                    <Icon name="mail" size={22} />
                  </span>
                  <span>
                    <span className="contact-card__label">Email</span>
                    <span className="contact-card__value">{company.email}</span>
                  </span>
                </a>
              </li>
              <li data-reveal="up">
                <div className="contact-card">
                  <span className="contact-card__icon">
                    <Icon name="pin" size={22} />
                  </span>
                  <span>
                    <span className="contact-card__label">Visit us</span>
                    <span className="contact-card__value">
                      {company.address.line1}, {company.address.line2}, {company.address.city}
                    </span>
                  </span>
                </div>
              </li>
            </ul>
            <div data-reveal="up">
              <MapEmbed query={company.mapQuery} label="AB Star Building, Megenagna, Addis Ababa" />
            </div>
          </div>

          <div className="contact__form" data-reveal="left">
            <h2 className="contact__title">Send us a message</h2>
            <p className="contact__sub">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
