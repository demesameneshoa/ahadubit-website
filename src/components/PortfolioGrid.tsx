"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { projects, type ProjectCategory } from "@/data/site";
import Icon from "./Icon";

const filters: ("All" | ProjectCategory)[] = ["All", "ERP", "HR & Management", "Apps & Platforms", "Surveillance & Networking"];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active]
  );

  return (
    <div className="portfolio">
      <div className="filters" role="group" aria-label="Filter projects" data-reveal="up">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button
              key={f}
              type="button"
              className={`filter ${active === f ? "is-active" : ""}`}
              aria-pressed={active === f}
              onClick={() => setActive(f)}
            >
              {f}
              <span className="filter__count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} projects
      </p>

      <ul className="project-grid" key={active}>
        {list.map((p, i) => (
          <li key={p.client} className="project-card" style={{ animationDelay: `${i * 60}ms` }} data-spotlight>
            <div className="project-card__top">
              <div className="project-card__logo">
                <Image src={p.logo} alt={`${p.client} logo`} width={120} height={80} />
              </div>
              <span className={`status ${p.status === "Completed" ? "status--done" : "status--live"}`}>
                <span className="status__dot" aria-hidden="true" />
                {p.status}
              </span>
            </div>
            <p className="project-card__type">{p.type}</p>
            <h3 className="project-card__client">{p.client}</h3>
            <ul className="project-card__list">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Icon name="check" size={16} strokeWidth={2.2} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="project-card__foot">
              <span>{p.sector}</span>
              {p.categories.map((c) => (
                <span key={c} className="tag">
                  {c}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
