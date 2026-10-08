import Link from "next/link";
import Icon from "./Icon";
import Waves from "./Waves";
import { company } from "@/data/site";

export default function CTA({
  title = "Ready to build what your business needs next?",
  text = "Tell us where you want to go. We'll map the system that gets you there — on-premise or in the cloud, priced in local currency.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__panel" data-reveal="scale">
          <div className="cta__waves">
            <Waves variant="cta" />
          </div>
          <div className="cta__content">
            <p className="eyebrow eyebrow--light">Let&apos;s talk</p>
            <h2 className="cta__title">{title}</h2>
            <p className="cta__text">{text}</p>
            <div className="cta__actions">
              <Link prefetch={false} href="/contact" className="btn btn--primary">
                Start a project
                <Icon name="arrow" size={18} />
              </Link>
              <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="btn btn--ghost-light">
                <Icon name="phone" size={18} />
                {company.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
