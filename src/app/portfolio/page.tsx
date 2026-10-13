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
        title="Work that runs every day."
        intro={`${projects.length} projects for Ethiopian organizations — ${done} completed and ${live} in progress — from Odoo ERP for manufacturers to video intercoms that serve citizens.`}
      />

      <section className="section section--tight-top">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>

      <CTA title="Your organization could be next." />
    </>
  );
}
