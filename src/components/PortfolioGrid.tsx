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
      <div className="segmented" role="group" aria-label="Filter projects by type">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button
              key={f}
              type="button"
              className="segmented__item"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
            >
              {f} <span className="segmented__count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "project" : "projects"}
      </p>

      <ul className="project-grid" key={active}>
        {list.map((p) => (
          <li key={p.client} className="project-card">
            <div className="project-card__top">
              <div className="project-card__logo">
                <Image src={p.logo} alt={`${p.client} logo`} width={120} height={80} />
              </div>
              <span className={`status ${p.status === "Completed" ? "status--done" : "status--live"}`}>
                <Icon name={p.status === "Completed" ? "check" : "clock"} size={14} strokeWidth={2.4} />
                {p.status}
              </span>
            </div>
            <p className="project-card__type">{p.type}</p>
            <h3 className="project-card__client">{p.client}</h3>
            <ul className="check-list check-list--compact">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Icon name="check" size={16} strokeWidth={2.2} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <p className="project-card__foot">
              {p.sector} · {p.categories.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
