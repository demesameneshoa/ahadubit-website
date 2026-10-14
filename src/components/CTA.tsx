import Link from "next/link";
import Icon from "./Icon";
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
        <div className="cta__panel" data-reveal="scale" data-pointer>
          <h2 className="cta__title">{title}</h2>
          <p className="cta__text">{text}</p>
          <div className="cta__actions">
            <Link prefetch={false} href="/contact" className="btn btn--primary">
              Start a project
            </Link>
            <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="btn btn--on-dark">
              <Icon name="phone" size={18} />
              Call {company.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
