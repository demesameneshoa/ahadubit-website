import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTA from "@/components/CTA";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description:
    "ERP, HR, IPTV, real-estate CRM, surveillance and video intercom projects delivered by Ahadubit Technologies for Ethiopian organizations.",
};

export default function PortfolioPage() {
  const done = projects.filter((p) => p.status === "Completed").length;
  const live = projects.length - done;
  return (
    <>
      <PageHero
        crumb="Portfolio"
        eyebrow="Projects portfolio"
        title={
          <>
            Work that runs <span className="hl">every day</span>.
          </>
        }
        intro="From Odoo ERP for manufacturers to video intercoms that serve citizens, here are projects we have delivered — and the ones we're building now."
      />

      <section className="section">
        <div className="container">
          <ul className="portfolio-stats" data-stagger="100">
            <li data-reveal="up">
              <strong data-count={projects.length}>{projects.length}</strong>
              <span>Featured projects</span>
            </li>
            <li data-reveal="up">
              <strong data-count={done}>{done}</strong>
              <span>Completed</span>
            </li>
            <li data-reveal="up">
              <strong data-count={live}>{live}</strong>
              <span>In progress</span>
            </li>
          </ul>
          <PortfolioGrid />
        </div>
      </section>

      <CTA title="Your organization could be next." />
    </>
  );
}
