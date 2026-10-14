"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { projects, type ProjectCategory } from "@/data/site";
import Icon from "./Icon";

const filters: ("All" | ProjectCategory)[] = ["All", "ERP", "HR & Management", "Apps & Platforms", "Surveillance & Networking"];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  // After the first filter change, cards render already revealed (no scroll trigger needed).
  const [touched, setTouched] = useState(false);
  const list = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active]
  );

  // FLIP: remember where each card was, then animate it from there to its new place.
  const cards = useRef(new Map<string, HTMLLIElement>());
  const before = useRef(new Map<string, DOMRect>());
  const segRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const choose = (f: (typeof filters)[number]) => {
    if (f === active) return;
    before.current = new Map(Array.from(cards.current.entries()).map(([k, el]) => [k, el.getBoundingClientRect()]));
    setActive(f);
    setTouched(true);
  };

  useLayoutEffect(() => {
    // Sliding selection indicator behind the active segment
    const seg = segRef.current;
    const btn = seg?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (seg && btn) {
      const s = seg.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setPill({ x: b.left - s.left, y: b.top - s.top, w: b.width, h: b.height });
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || before.current.size === 0) return;
    cards.current.forEach((el, key) => {
      const prev = before.current.get(key);
      const next = el.getBoundingClientRect();
      if (prev) {
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (dx || dy) {
          el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }], {
            duration: 420,
            easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          });
        }
      } else {
        el.animate([{ opacity: 0, transform: "scale(0.96)" }, { opacity: 1, transform: "scale(1)" }], {
          duration: 320,
          easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        });
      }
    });
    before.current = new Map();
  }, [active]);

  useLayoutEffect(() => {
    const onResize = () => {
      const seg = segRef.current;
      const btn = seg?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (seg && btn) {
        const s = seg.getBoundingClientRect();
        const b = btn.getBoundingClientRect();
        setPill({ x: b.left - s.left, y: b.top - s.top, w: b.width, h: b.height });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="portfolio">
      <div className="segmented" role="group" aria-label="Filter projects by type" ref={segRef} data-reveal="up">
        {pill && (
          <span
            className="segmented__pill"
            aria-hidden="true"
            style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h }}
          />
        )}
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          return (
            <button key={f} type="button" className="segmented__item" aria-pressed={active === f} onClick={() => choose(f)}>
              {f} <span className="segmented__count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "project" : "projects"}
      </p>

      <ul className={`project-grid${touched ? " no-stagger" : ""}`} data-stagger>
        {list.map((p) => (
          <li
            key={p.client}
            className={`project-card${touched ? " is-in" : ""}`}
            data-reveal="up"
            data-tilt
            ref={(el) => {
              if (el) cards.current.set(p.client, el);
              else cards.current.delete(p.client);
            }}
          >
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
