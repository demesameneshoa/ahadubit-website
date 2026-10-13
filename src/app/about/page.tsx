import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { company, features, projects } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2019, Ahadubit Technologies PLC helps Ethiopian organizations transform their day-to-day operations through automation and technology.",
};

const audiences = [
  { icon: "spark" as const, title: "Service providers", text: "Hotels, events and service businesses that need connected, reliable operations." },
  { icon: "industry" as const, title: "Private manufacturers", text: "Factories that run purchase, production, quality and maintenance on one ERP." },
  { icon: "network" as const, title: "Government agencies", text: "Public bodies modernizing HR, citizen service, surveillance and communications." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title="Solutions for tomorrow, delivered today."
        intro="Since 2019, Ahadubit has helped companies in Ethiopia transform their day-to-day work with automation — and still serves them today."
      />

      {/* STORY */}
      <section className="section section--tight-top">
        <div className="container story">
          <div className="story__body">
            <h2 className="section-title" data-reveal>
              Ideas that serve Ethiopian companies
            </h2>
            <p className="lead" data-reveal>
              Ahadubit Technologies PLC was founded in {company.founded} to build ideas that serve companies in Ethiopia
              and transform their day-to-day activities with automation.
            </p>
            <p data-reveal>
              Since then, we have served companies across many industries: manufacturers running Odoo-based ERP, a hotel
              streaming IPTV to every room, a university registering students online, and a government bureau connecting
              citizens with experts through video intercom.
            </p>
            <p data-reveal>
              We act as one technology partner for software, hardware, networks and the cloud — and we stay with clients
              after go-live.
            </p>
          </div>
          <dl className="facts facts--stacked" data-reveal>
            <div>
              <dt>Founded</dt>
              <dd>{company.founded}</dd>
            </div>
            <div>
              <dt>Organizations served</dt>
              <dd>{projects.length}+</dd>
            </div>
            <div>
              <dt>Odoo experience</dt>
              <dd>5+ years</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Addis Ababa</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* MISSION / PHILOSOPHY */}
      <section className="section section--grouped">
        <div className="container mp">
          <article className="mp__card" data-reveal>
            <span className="mp__icon" aria-hidden="true">
              <Icon name="target" size={26} />
            </span>
            <h2 className="mp__title">Mission</h2>
            <ul className="check-list">
              <li>
                <Icon name="check" size={18} strokeWidth={2.2} />
                Be a driving force in transforming Ethiopia into a tech hub on the continent.
              </li>
              <li>
                <Icon name="check" size={18} strokeWidth={2.2} />
                Be the go-to company for software and hardware requirements in Ethiopia.
              </li>
            </ul>
          </article>
          <article className="mp__card" data-reveal>
            <span className="mp__icon" aria-hidden="true">
              <Icon name="compass" size={26} />
            </span>
            <h2 className="mp__title">Philosophy: Solutions for Tomorrow</h2>
            <p>
              As the IT industry becomes more dynamic, we build solutions that work efficiently on today&apos;s company
              standards and keep working as our clients expand and transform.
            </p>
          </article>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title" data-reveal>
              Who we serve
            </h2>
          </div>
          <ul className="audience">
            {audiences.map((a) => (
              <li key={a.title} data-reveal>
                <span className="audience__icon" aria-hidden="true">
                  <Icon name={a.icon} size={24} />
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section section--grouped">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title" data-reveal>
              What working with us looks like
            </h2>
          </div>
          <ul className="feature-list feature-list--grid">
            {features.map((f) => (
              <li key={f.title} className="feature-list__item" data-reveal>
                <span className="feature-list__icon" aria-hidden="true">
                  <Icon name={f.icon} size={24} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA title="Let's build your next system together." />
    </>
  );
}
