/**
 * Scroll behaviour, kept deliberately small:
 *  - [data-reveal] elements fade up once as they enter the viewport
 *    (skipped entirely when the visitor prefers reduced motion)
 *  - the header gets a separator once the page has scrolled
 * Returns a cleanup function.
 */
export function initScrollEffects(root: ParentNode = document): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: Array<() => void> = [];

  const revealEls = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    document.documentElement.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener("scroll", onScroll));

  return () => cleanups.forEach((fn) => fn());
}
