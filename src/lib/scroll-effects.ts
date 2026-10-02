/**
 * Framework-free scroll effects used across the site.
 *
 *  [data-reveal]          fades/slides in when it enters the viewport
 *                         (value: "up" | "left" | "right" | "scale" | "fade")
 *  [data-delay="120"]     extra delay in ms for a reveal
 *  [data-stagger]         children with [data-reveal] get incremental delays
 *  [data-count="12"]      counts up from 0 when visible (data-suffix / data-prefix)
 *  [data-parallax="0.2"]  translates on scroll by speed × offset
 *  [data-progress]        exposes --progress (0 → 1) as it travels through the viewport
 *
 * Returns a cleanup function.
 */
export function initScrollEffects(root: ParentNode = document): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: Array<() => void> = [];

  // Stagger: assign delays to children
  root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
    const step = Number(group.dataset.stagger) || 90;
    group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = String(i * step);
    });
  });

  // Reveal
  const revealEls = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
  revealEls.forEach((el) => {
    if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
  });

  // Counters
  const countEls = Array.from(root.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])"));
  const runCount = (el: HTMLElement) => {
    el.dataset.counted = "1";
    const target = Number(el.dataset.count) || 0;
    const prefix = el.dataset.prefix ?? "";
    const suffix = el.dataset.suffix ?? "";
    if (reduce) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.hasAttribute("data-reveal")) {
            el.classList.add("is-in");
            // Drop the stagger delay once revealed so hover transitions stay snappy.
            const d = Number(el.dataset.delay) || 0;
            window.setTimeout(() => {
              el.style.transitionDelay = "";
            }, d + 950);
          }
          if (el.hasAttribute("data-count") && !el.dataset.counted) runCount(el);
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
    countEls.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
    countEls.forEach(runCount);
  }

  // Scroll-linked: parallax, progress, header state, page progress
  const parallaxEls = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
  const progressEls = Array.from(root.querySelectorAll<HTMLElement>("[data-progress]"));
  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - vh;
    document.documentElement.style.setProperty("--page-progress", docH > 0 ? String(y / docH) : "0");
    document.documentElement.classList.toggle("is-scrolled", y > 24);

    if (!reduce) {
      parallaxEls.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.2;
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      });
    }

    progressEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const total = rect.height + vh * 0.5;
      const passed = vh * 0.75 - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      el.style.setProperty("--progress", p.toFixed(3));
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  });

  // Pointer spotlight on cards
  const spotlightEls = Array.from(root.querySelectorAll<HTMLElement>("[data-spotlight]"));
  spotlightEls.forEach((el) => {
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", move);
    cleanups.push(() => el.removeEventListener("pointermove", move));
  });

  return () => cleanups.forEach((fn) => fn());
}
