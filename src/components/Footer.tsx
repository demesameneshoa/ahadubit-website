import Link from "next/link";
import Image from "next/image";
import { company, nav, services } from "@/data/site";
import Icon from "./Icon";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Image src="/brand/logo-light.png" alt="Ahadubit Technologies" width={468} height={108} className="site-footer__logo" />
          <p>
            Ethiopian technology partner since {company.founded}. ERP, custom software, cloud, networking and hardware
            integration — built for how Ethiopian organizations work.
          </p>
          <a href={company.linkedin} className="social" target="_blank" rel="noopener noreferrer" aria-label="Ahadubit on LinkedIn">
            <Icon name="linkedin" size={20} />
            <span>LinkedIn</span>
          </a>
        </div>

        <div>
          <h2 className="site-footer__title">Company</h2>
          <ul className="site-footer__list">
            {nav.map((n) => (
              <li key={n.href}>
                <Link prefetch={false} href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Services</h2>
          <ul className="site-footer__list">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link prefetch={false} href={`/services#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <Icon name="pin" size={18} />
              <span>
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.city}
              </span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <span>
                {company.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`}>
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} {company.name}. All rights reserved.</p>
        <p className="site-footer__tag">{company.tagline}</p>
      </div>
    </footer>
  );
}
