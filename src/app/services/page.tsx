import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { process, projects, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "ERP solutions, custom apps, web development and hosting, cloud, networking and communications, hardware integration, financial solutions and HRM systems from Ahadubit Technologies.",
};

const related: Record<string, string[]> = {
  erp: ["Top Water Ethiopia", "Maereg Manufacturing", "Meti Trading PLC"],
  "custom-apps": ["Temer Properties", "Elgel Hotel and Spa", "Kebri Dehar University"],
  networking: ["Shemu Group PLC", "Oromia Urban Development & Housing Bureau", "Oromia Investment Commission"],
  hardware: ["Elgel Hotel and Spa", "Great Ethiopian Run", "Oromia Investment Commission"],
  hrm: ["Great Ethiopian Run", "Oromia Investment Commission"],
  web: ["Oromia Investment Commission", "Kebri Dehar University"],
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Products & services"
        title={
          <>
            One partner for every layer of <span className="hl">your technology</span>.
          </>
        }
        intro="We deliver comprehensive solutions and act as a technology partner for our clients in every aspect — from the ERP your teams use daily to the cables, cameras and cloud underneath."
      />

      <section className="section">
        <div className="container services-layout">
          <aside className="services-index" aria-label="Services">
            <p className="services-index__label">Jump to</p>
            <ul>
              {services.map((s, i) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="services-list">
            {services.map((s, i) => {
              const rel = (related[s.slug] || []).filter((n) => projects.some((p) => p.client === n));
              return (
                <article key={s.slug} id={s.slug} className="service-block" data-reveal="up">
                  <div className="service-block__head">
                    <span className="service-block__icon">
                      <Icon name={s.icon} size={30} />
                    </span>
                    <span className="service-block__num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2>{s.title}</h2>
                  <p className="service-block__summary">{s.summary}</p>
                  <p>{s.detail}</p>
                  <ul className="service-block__points">
                    {s.points.map((pt) => (
                      <li key={pt}>
                        <Icon name="check" size={16} strokeWidth={2.2} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {rel.length > 0 && (
                    <p className="service-block__rel">
                      <span>Delivered for</span> {rel.join(" · ")}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal="up">
                How we work
              </p>
              <h2 className="section-title" data-reveal="up" data-delay="60">
                From first conversation to long-term support
              </h2>
            </div>
            <p className="section-head__text" data-reveal="up" data-delay="120">
              A clear, collaborative process keeps projects on schedule and makes sure your team owns the result.
            </p>
          </div>
          <div className="process" data-progress>
            <span className="process__line" aria-hidden="true">
              <span />
            </span>
            <ol className="process__steps">
            {process.map((p, i) => (
              <li key={p.step} className="process__step" data-reveal="up" data-delay={String(i * 100)}>
                <span className="process__dot">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
            </ol>
          </div>
          <div className="center" data-reveal="up">
            <Link prefetch={false} href="/portfolio" className="link-arrow">
              See the results in our portfolio <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
