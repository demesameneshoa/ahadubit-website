import type { Metadata } from "next";
import Image from "next/image";
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
  { title: "Service providers", text: "Hotels, events and service businesses that need connected, reliable operations." },
  { title: "Private manufacturers", text: "Factories that run purchase, production, quality and maintenance on one ERP." },
  { title: "Government agencies", text: "Public bodies modernizing HR, citizen service, surveillance and communications." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Ahadubit"
        title={
          <>
            Solutions for <span className="hl">tomorrow</span>, delivered today.
          </>
        }
        intro="Since 2019 we have helped companies in Ethiopia transform their day-to-day activities with automation — and we're still serving them with complete satisfaction."
      />

      {/* STORY */}
      <section className="section">
        <div className="container story">
          <div className="story__aside" data-reveal="right">
            <div className="story__badge">
              <Image src="/brand/mark.png" alt="" width={256} height={256} />
              <div>
                <strong>Est. {company.founded}</strong>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
            <dl className="story__facts">
              <div>
                <dt>Organizations served</dt>
                <dd>
                  <span data-count={projects.length} data-suffix="+">
                    {projects.length}+
                  </span>
                </dd>
              </div>
              <div>
                <dt>Odoo experience</dt>
                <dd>
                  <span data-count="5" data-suffix="+ yrs">
                    5+ yrs
                  </span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="story__body">
            <p className="eyebrow" data-reveal="up">
              Our story
            </p>
            <h2 className="section-title" data-reveal="up" data-delay="60">
              Ideas that serve Ethiopian companies.
            </h2>
            <p className="lead" data-reveal="up" data-delay="120">
              Ahadubit Technologies PLC was founded in 2019. From the start, we invested our resources in coming up with
              ideas that could serve companies in Ethiopia and transform their day-to-day activities with automation.
            </p>
            <p data-reveal="up" data-delay="160">
              Since our establishment, we have served — and still serve — companies across many industries: manufacturers
              running Odoo-based ERP, hotels streaming IPTV to every room, universities registering students online, and
              government bureaus connecting citizens with experts through video intercom.
            </p>
            <p data-reveal="up" data-delay="200">
              We act as a technology partner in every aspect: software, hardware, networks and the cloud, delivered by one team
              that stays with you after go-live.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION / PHILOSOPHY */}
      <section className="section section--tint">
        <div className="container mp">
          <article className="mp__card" data-reveal="up" data-spotlight>
            <span className="mp__icon">
              <Icon name="target" size={30} />
            </span>
            <p className="eyebrow">Mission</p>
            <h2 className="mp__title">Where we&apos;re headed</h2>
            <ul className="mp__list">
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
          <article className="mp__card mp__card--dark" data-reveal="up" data-delay="120" data-spotlight>
            <span className="mp__icon">
              <Icon name="compass" size={30} />
            </span>
            <p className="eyebrow eyebrow--light">Philosophy</p>
            <h2 className="mp__title">&ldquo;Solutions for Tomorrow&rdquo;</h2>
            <p>
              As the IT industry — and every other — becomes more dynamic, we aspire to provide solutions that work
              efficiently not only on the current company standard but also in the future, as our clients expand and
              transform.
            </p>
          </article>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal="up">
                Who we serve
              </p>
              <h2 className="section-title" data-reveal="up" data-delay="60">
                Clients from diverse sectors
              </h2>
            </div>
          </div>
          <ol className="audience" data-stagger="100">
            {audiences.map((a, i) => (
              <li key={a.title} data-reveal="up">
                <span className="audience__num">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--light" data-reveal="up">
                Key features
              </p>
              <h2 className="section-title section-title--light" data-reveal="up" data-delay="60">
                What working with us looks like
              </h2>
            </div>
          </div>
          <ul className="feature-grid" data-stagger="80">
            {features.map((f) => (
              <li key={f.title} className="feature" data-reveal="up">
                <Icon name={f.icon} size={28} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA title="Let's build your next system together." />
    </>
  );
}
