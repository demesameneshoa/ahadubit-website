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
        title="One partner for every layer of your technology."
        intro="From the ERP your teams use daily to the cables, cameras and cloud underneath — designed, built and supported by one team."
      />

      <section className="section section--tight-top">
        <div className="container services-layout">
          <nav className="services-index" aria-label="Services on this page">
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="services-list">
            {services.map((s) => {
              const rel = (related[s.slug] || []).filter((n) => projects.some((p) => p.client === n));
              return (
                <article key={s.slug} id={s.slug} className="service-block" data-reveal>
                  <span className="service-block__icon" aria-hidden="true">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <div>
                    <h2>{s.title}</h2>
                    <p className="service-block__summary">{s.summary}</p>
                    <p>{s.detail}</p>
                    <ul className="check-list check-list--two">
                      {s.points.map((pt) => (
                        <li key={pt}>
                          <Icon name="check" size={16} strokeWidth={2.2} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    {rel.length > 0 && (
                      <p className="service-block__rel">
                        <strong>Delivered for:</strong> {rel.join(", ")}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--grouped">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title" data-reveal>
              How a project runs
            </h2>
            <p className="section-head__text" data-reveal>
              Five steps from first conversation to long-term support, so projects stay on schedule and your team owns
              the result.
            </p>
          </div>
          {/* A real sequence, so it keeps its step numbers */}
          <ol className="process">
            {process.map((p) => (
              <li key={p.step} className="process__step" data-reveal>
                <span className="process__num" aria-hidden="true">
                  {Number(p.step)}
                </span>
                <h3>
                  <span className="sr-only">Step {Number(p.step)}: </span>
                  {p.title}
                </h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
          <p className="center" data-reveal>
            <Link prefetch={false} href="/portfolio" className="link-arrow">
              See the results in our portfolio <Icon name="arrow" size={18} />
            </Link>
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
