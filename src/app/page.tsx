import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import Waves from "@/components/Waves";
import CTA from "@/components/CTA";
import ClientLogos from "@/components/ClientLogos";
import ScrollHighlight from "@/components/ScrollHighlight";
import { company, features, projects, services } from "@/data/site";

const featured = [
  "Top Water Ethiopia",
  "Elgel Hotel and Spa",
  "Temer Properties",
  "Oromia Investment Commission",
  "Shemu Group PLC",
  "Kebri Dehar University",
]
  .map((n) => projects.find((p) => p.client === n))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export default function HomePage() {
  return (
    <>
      {/* HERO — waves follow the pointer and drift as the page scrolls */}
      <section className="hero" data-scroll="exit" data-pointer>
        <div className="hero__waves" aria-hidden="true">
          <Waves />
        </div>
        <div className="container">
          <div className="hero__copy">
            <p className="hero__kicker hero-in" style={{ ["--d" as string]: 0 } as React.CSSProperties}>
              Addis Ababa · Since {company.founded}
            </p>
            <h1 className="hero__title hero-in" style={{ ["--d" as string]: 1 } as React.CSSProperties}>
              Technology that moves Ethiopian business forward.
            </h1>
            <p className="hero__lead hero-in" style={{ ["--d" as string]: 2 } as React.CSSProperties}>
              ERP, custom software, cloud, networks and hardware integration — built for how Ethiopian organizations
              work, and ready for what comes next.
            </p>
            <div className="hero__actions hero-in" style={{ ["--d" as string]: 3 } as React.CSSProperties}>
              <Link prefetch={false} href="/contact" className="btn btn--primary btn--lg">
                Start a project
              </Link>
              <Link prefetch={false} href="/portfolio" className="btn btn--secondary btn--lg">
                See our work
              </Link>
            </div>
          </div>
        </div>
        <div className="container hero__proof">
          <p className="hero__proof-label" data-reveal="fade">
            Trusted by manufacturers, hotels, universities and government agencies
          </p>
          <ClientLogos limit={6} className="logo-grid--compact" />
        </div>
      </section>

      {/* STATEMENT — words light up as you scroll */}
      <section className="section statement" aria-label="About Ahadubit">
        <div className="container">
          <ScrollHighlight
            className="statement__text"
            text="Since 2019, Ahadubit has helped Ethiopian manufacturers, hotels, universities and government agencies replace paperwork and guesswork with systems that run every day — and keep working as they grow."
          />
        </div>
      </section>

      {/* SERVICES — staggered entrance, cards tilt toward the pointer */}
      <section className="section section--grouped" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <h2 id="services-title" className="section-title" data-reveal>
              Products and services
            </h2>
            <p className="section-head__text" data-reveal>
              One team for every layer of your technology, from the ERP your staff use daily to the cables, cameras and
              cloud underneath.
            </p>
          </div>
          <ul className="service-grid" data-stagger>
            {services.map((s) => (
              <li key={s.slug} data-reveal="up">
                <Link prefetch={false} href={`/services#${s.slug}`} className="service-card" data-tilt>
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h3 className="service-card__title">
                    {s.title}
                    <Icon name="arrow" size={18} className="service-card__arrow" />
                  </h3>
                  <p>{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SELECTED WORK — pinned horizontal gallery driven by vertical scroll */}
      <section className="hscroll" data-hscroll aria-labelledby="work-title">
        <div className="hscroll__sticky">
          <div className="container hscroll__head">
            <h2 id="work-title" className="section-title" data-reveal>
              Systems in daily use across Ethiopia
            </h2>
            <Link prefetch={false} href="/portfolio" className="link-arrow" data-reveal>
              View all {projects.length} projects <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="hscroll__viewport" role="region" tabIndex={0} aria-label="Selected projects">
            <ul className="hscroll__track" data-hscroll-track>
              {featured.map((p) => (
                <li key={p.client} className="work-card">
                  <div className="work-card__logo">
                    <Image src={p.logo} alt={`${p.client} logo`} width={140} height={90} />
                  </div>
                  <div className="work-card__body">
                    <p className="work-card__type">{p.type}</p>
                    <h3>{p.client}</h3>
                    <p>{p.highlights[0]}.</p>
                    <span className={`status ${p.status === "Completed" ? "status--done" : "status--live"}`}>
                      <Icon name={p.status === "Completed" ? "check" : "clock"} size={14} strokeWidth={2.4} />
                      {p.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="container">
            <div className="hscroll__progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* WHY — each reason lights up as it reaches the middle of the screen */}
      <section className="section section--grouped" aria-labelledby="why-title">
        <div className="container why">
          <div className="why__intro">
            <h2 id="why-title" className="section-title" data-reveal>
              Built locally. Built to last.
            </h2>
            <p data-reveal>
              Founded in {company.founded}, Ahadubit has served service providers, manufacturers and government agencies
              — pairing deep Odoo and software experience with a practical understanding of how Ethiopian organizations
              operate.
            </p>
            <dl className="facts" data-reveal>
              <div>
                <dt>Organizations served</dt>
                <dd data-count={projects.length} data-suffix="+">
                  {projects.length}+
                </dd>
              </div>
              <div>
                <dt>Odoo experience</dt>
                <dd data-count="5" data-suffix="+ years">
                  5+ years
                </dd>
              </div>
              <div>
                <dt>Service lines</dt>
                <dd data-count={services.length}>{services.length}</dd>
              </div>
            </dl>
            <Link prefetch={false} href="/about" className="link-arrow" data-reveal>
              About Ahadubit <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="feature-list" data-stagger>
            {features.map((f) => (
              <li key={f.title} className="feature-list__item" data-reveal="left" data-activate>
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

      <CTA />
    </>
  );
}
