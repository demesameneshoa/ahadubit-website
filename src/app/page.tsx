import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import Waves from "@/components/Waves";
import CTA from "@/components/CTA";
import ClientMarquee from "@/components/ClientMarquee";
import { company, features, projects, services } from "@/data/site";

const featured = ["Top Water Ethiopia", "Elgel Hotel and Spa", "Temer Properties"]
  .map((n) => projects.find((p) => p.client === n))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

const orbit = services.slice(0, 6);

const sectors = ["Manufacturing", "Government", "Hospitality", "Education", "Real Estate", "Trading", "Food Processing", "Sports & Events"];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" data-parallax="0.12">
          <Waves tone="dark" lines={46} seed={0.6} />
        </div>
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light" data-reveal="up">
              <span className="eyebrow__dot" aria-hidden="true" />
              Addis Ababa · Since {company.founded}
            </p>
            <h1 className="hero__title" data-reveal="up" data-delay="80">
              Technology that moves <span className="hl">Ethiopian business</span> forward.
            </h1>
            <p className="hero__lead" data-reveal="up" data-delay="160">
              Ahadubit Technologies builds the systems organizations run on — Odoo ERP, custom web and mobile apps, cloud,
              networking and hardware integration — designed for today and ready for what comes next.
            </p>
            <div className="hero__actions" data-reveal="up" data-delay="240">
              <Link href="/contact" className="btn btn--primary">
                Start a project
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="/portfolio" className="btn btn--ghost-light">
                See our work
              </Link>
            </div>
            <p className="hero__tag" data-reveal="fade" data-delay="320">
              <span>{company.tagline}</span>
            </p>
          </div>

          <div className="hero__visual" data-reveal="scale" data-delay="200">
            <div className="orbit">
              <div className="orbit__ring orbit__ring--1" />
              <div className="orbit__ring orbit__ring--2" />
              <div className="orbit__ring orbit__ring--3" />
              <div className="orbit__core">
                <Image src="/brand/mark.png" alt="" width={256} height={256} priority />
              </div>
              <ul className="orbit__items">
                {orbit.map((s, i) => (
                  <li key={s.slug} style={{ ["--i" as string]: i, ["--n" as string]: orbit.length } as React.CSSProperties}>
                    <Link href={`/services#${s.slug}`} className="orbit__chip">
                      <Icon name={s.icon} size={20} />
                      <span>{s.title.replace(" Development", "").replace(" Solutions", "")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <a href="#stats" className="scroll-cue" aria-label="Scroll to content">
          <span />
        </a>
      </section>

      {/* STATS */}
      <section id="stats" className="stats">
        <div className="container">
          <ul className="stats__grid" data-stagger="100">
            <li data-reveal="up">
              <strong>{company.founded}</strong>
              <span>Year founded</span>
            </li>
            <li data-reveal="up">
              <strong data-count={projects.length} data-suffix="+">
                {projects.length}+
              </strong>
              <span>Organizations served</span>
            </li>
            <li data-reveal="up">
              <strong data-count={services.length}>{services.length}</strong>
              <span>Service lines</span>
            </li>
            <li data-reveal="up">
              <strong data-count="5" data-suffix="+">
                5+
              </strong>
              <span>Years of Odoo expertise</span>
            </li>
          </ul>
        </div>
      </section>

      {/* INTRO */}
      <section className="section intro">
        <div className="container intro__grid">
          <div>
            <p className="eyebrow" data-reveal="up">
              Who we are
            </p>
            <h2 className="section-title" data-reveal="up" data-delay="60">
              A technology partner for organizations in every sector.
            </h2>
          </div>
          <div className="intro__body">
            <p data-reveal="up" data-delay="120">
              Founded in 2019, Ahadubit Technologies PLC invests in ideas that serve companies in Ethiopia and transform
              their day-to-day work with automation. Since then we have served service providers, private manufacturers and
              government agencies — and we&apos;re still serving them.
            </p>
            <p data-reveal="up" data-delay="180">
              As the IT industry grows more dynamic, we build solutions that work efficiently on today&apos;s standards and keep
              working as our clients expand and transform.
            </p>
            <Link href="/about" className="link-arrow" data-reveal="up" data-delay="240">
              More about Ahadubit <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal="up">
                What we do
              </p>
              <h2 className="section-title" data-reveal="up" data-delay="60">
                Products & services
              </h2>
            </div>
            <p className="section-head__text" data-reveal="up" data-delay="120">
              Comprehensive solutions from one team — so you have a single technology partner for every aspect of your
              business.
            </p>
          </div>
          <ul className="service-grid" data-stagger="70">
            {services.map((s, i) => (
              <li key={s.slug} data-reveal="up">
                <Link href={`/services#${s.slug}`} className="service-card" data-spotlight>
                  <span className="service-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="service-card__icon">
                    <Icon name={s.icon} size={28} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="service-card__more">
                    Learn more <Icon name="arrow" size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="section why">
        <div className="container why__grid">
          <div className="why__sticky">
            <p className="eyebrow" data-reveal="up">
              Why Ahadubit
            </p>
            <h2 className="section-title" data-reveal="up" data-delay="60">
              Built locally. Built to last.
            </h2>
            <p className="why__text" data-reveal="up" data-delay="120">
              We pair deep Odoo and software experience with a practical understanding of how Ethiopian organizations
              operate — so systems go live faster and keep paying off.
            </p>
            <Link href="/contact" className="btn btn--dark" data-reveal="up" data-delay="180">
              Talk to our team
              <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="why__list" data-stagger="80">
            {features.map((f) => (
              <li key={f.title} className="why__item" data-reveal="left">
                <span className="why__icon">
                  <Icon name={f.icon} size={26} />
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

      {/* FEATURED WORK */}
      <section className="section section--dark work">
        <div className="work__waves" aria-hidden="true">
          <Waves tone="dark" lines={24} seed={3.1} />
        </div>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--light" data-reveal="up">
                Selected work
              </p>
              <h2 className="section-title section-title--light" data-reveal="up" data-delay="60">
                Systems in production across Ethiopia
              </h2>
            </div>
            <Link href="/portfolio" className="btn btn--ghost-light" data-reveal="up" data-delay="120">
              Full portfolio
              <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="work__grid" data-stagger="120">
            {featured.map((p) => (
              <li key={p.client} className="work-card" data-reveal="up" data-spotlight>
                <div className="work-card__logo">
                  <Image src={p.logo} alt={`${p.client} logo`} width={140} height={90} />
                </div>
                <p className="work-card__type">{p.type}</p>
                <h3>{p.client}</h3>
                <p className="work-card__text">{p.highlights[0]}.</p>
                <span className="work-card__sector">{p.sector}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section clients">
        <div className="container">
          <div className="clients__head">
            <p className="eyebrow" data-reveal="up">
              Trusted by
            </p>
            <h2 className="section-title section-title--sm" data-reveal="up" data-delay="60">
              Service providers, manufacturers and government agencies
            </h2>
          </div>
        </div>
        <div data-reveal="fade" data-delay="120">
          <ClientMarquee />
        </div>
        <div className="container">
          <ul className="sectors" data-stagger="50">
            {sectors.map((s) => (
              <li key={s} data-reveal="up">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
