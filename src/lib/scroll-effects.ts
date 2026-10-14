/**
 * Scroll & pointer interaction engine — framework-free, one rAF loop.
 *
 * Motion follows the visitor's own input (scroll position, pointer), plays at
 * most once, and is skipped entirely when "Reduce Motion" is on.
 *
 *  [data-reveal="up|scale|left|right|fade"]  fade/slide in once when visible
 *  [data-stagger]                            children reveal one after another
 *  [data-scroll="exit|through|pin"]          sets --p (0 → 1) as it scrolls:
 *        exit    = element leaving the top of the viewport (heroes)
 *        through = element travelling from viewport bottom to top
 *        pin     = scroll distance through a tall section with a sticky child
 *  [data-count="12" data-suffix="+"]         counts up once when visible
 *  [data-activate]                           .is-active while near viewport centre
 *  [data-spy] a[href^="#"]                   .is-current on the link whose section is in view
 *  [data-highlight]                          words (.hl-word) light up as it scrolls
 *  [data-tilt]                               3-D tilt toward the pointer (fine pointers)
 *  [data-pointer]                            sets --mx/--my (-1 → 1) from the pointer
 *  [data-hscroll]                            pinned horizontal gallery driven by vertical scroll
 *  :root --page-p                            page scroll progress (top bar)
 *  :root.show-top                            after scrolling past one screen (back-to-top)
 */
export function initScrollEffects(root: ParentNode = document): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const doc = document.documentElement;
  const cleanups: Array<() => void> = [];
  const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & Element>(sel)) as T[];

  /* ---------- stagger indexes ---------- */
  q<HTMLElement>("[data-stagger]").forEach((group) => {
    let i = 0;
    Array.from(group.children).forEach((child) => {
      const el = child as HTMLElement;
      if (el.hasAttribute("data-reveal")) el.style.setProperty("--i", String(Math.min(i++, 10)));
    });
  });

  /* ---------- count-up ---------- */
  const runCount = (el: HTMLElement) => {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix ?? "";
    if (reduce) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- reveal + count (IntersectionObserver) ---------- */
  const revealEls = q<HTMLElement>("[data-reveal]:not(.is-in)");
  const countEls = q<HTMLElement>("[data-count]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
    countEls.forEach(runCount);
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-reveal")) el.classList.add("is-in");
          if (el.hasAttribute("data-count")) runCount(el);
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
    countEls.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  }

  /* ---------- scroll-linked elements ---------- */
  const scrollEls = q<HTMLElement>("[data-scroll]");
  const activateEls = q<HTMLElement>("[data-activate]");
  const highlightEls = q<HTMLElement>("[data-highlight]");
  const hscrollEls = q<HTMLElement>("[data-hscroll]");
  const spyLinks = q<HTMLAnchorElement>("[data-spy] a[href^='#']");
  const spyTargets = spyLinks
    .map((a) => ({ a, el: document.getElementById(decodeURIComponent(a.hash.slice(1))) }))
    .filter((x): x is { a: HTMLAnchorElement; el: HTMLElement } => Boolean(x.el));

  const words = new Map<HTMLElement, HTMLElement[]>();
  highlightEls.forEach((el) => {
    const w = Array.from(el.querySelectorAll<HTMLElement>(".hl-word"));
    words.set(el, w);
    if (reduce) w.forEach((s) => s.classList.add("is-on"));
  });

  // Horizontal galleries need their travel distance measured.
  const measureH = () => {
    hscrollEls.forEach((el) => {
      const track = el.querySelector<HTMLElement>("[data-hscroll-track]");
      if (!track) return;
      const pinned = !reduce && window.innerWidth >= 900;
      el.classList.toggle("is-pinned", pinned);
      const dist = Math.max(0, track.scrollWidth - track.clientWidth);
      el.style.setProperty("--dist", `${dist}px`);
      el.style.setProperty("--pin-h", pinned ? `${dist + window.innerHeight}px` : "auto");
    });
  };
  measureH();

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const max = doc.scrollHeight - vh;
    doc.style.setProperty("--page-p", max > 0 ? (y / max).toFixed(4) : "0");
    doc.classList.toggle("is-scrolled", y > 8);
    doc.classList.toggle("show-top", y > vh * 1.2);

    if (!reduce) {
      scrollEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const mode = el.dataset.scroll;
        let p: number;
        if (mode === "exit") p = -r.top / Math.max(1, r.height);
        else if (mode === "pin") p = -r.top / Math.max(1, r.height - vh);
        else p = (vh - r.top) / (vh + r.height);
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      });

      hscrollEls.forEach((el) => {
        if (!el.classList.contains("is-pinned")) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
        el.style.setProperty("--p", p.toFixed(4));
      });

      highlightEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const list = words.get(el) || [];
        // Light words between "paragraph top hits 85% of viewport" and "bottom hits 45%".
        const start = vh * 0.85;
        const end = vh * 0.45;
        const p = Math.min(1, Math.max(0, (start - r.top) / Math.max(1, start - end + r.height * 0.6)));
        const on = Math.round(p * list.length);
        list.forEach((w, i) => w.classList.toggle("is-on", i < on));
      });
    }

    const mid = vh / 2;
    activateEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      el.classList.toggle("is-active", r.top < mid + vh * 0.15 && r.bottom > mid - vh * 0.15);
    });

    if (spyTargets.length) {
      let current: HTMLAnchorElement | null = null;
      for (const { a, el } of spyTargets) {
        if (el.getBoundingClientRect().top < vh * 0.35) current = a;
      }
      spyTargets.forEach(({ a }) => {
        const on = a === current;
        a.classList.toggle("is-current", on);
        if (on) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  const onResize = () => {
    measureH();
    onScroll();
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  });

  /* ---------- pointer: tilt + parallax (fine pointers only) ---------- */
  if (!reduce && finePointer) {
    q<HTMLElement>("[data-tilt]").forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      };
      const leave = () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    q<HTMLElement>("[data-pointer]").forEach((el) => {
      let raf = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        });
      };
      el.addEventListener("pointermove", move);
      cleanups.push(() => el.removeEventListener("pointermove", move));
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
