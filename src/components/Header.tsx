"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header className="site-header">
      <div className="page-progress" aria-hidden="true" />
      <div className="container site-header__inner">
        <Link prefetch={false} href="/" className="brand" aria-label="Ahadubit Technologies — home">
          <Image src="/brand/logo.png" alt="Ahadubit Technologies" width={468} height={108} priority className="brand__logo brand__logo--dark" />
          <Image src="/brand/logo-light.png" alt="" width={468} height={108} priority className="brand__logo brand__logo--light" />
        </Link>

        <nav className="main-nav" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className={isActive(item.href) ? "is-active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link prefetch={false} href="/contact" className="btn btn--primary btn--sm site-header__cta">
          Get in touch
          <Icon name="arrow" size={16} />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>
    </header>

      {/* Kept outside <header>: the header's backdrop-filter would otherwise become the
          containing block for this fixed overlay and clip it to the header bar. */}
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}>
                <Link prefetch={false} href={item.href} tabIndex={open ? 0 : -1} className={isActive(item.href) ? "is-active" : undefined}>
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="mailto:info@ahadubit.com" className="mobile-menu__mail" tabIndex={open ? 0 : -1}>
            info@ahadubit.com
          </a>
        </nav>
      </div>
    </>
  );
}
