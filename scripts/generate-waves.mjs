// Generates the decorative contour-line backgrounds as static, cacheable SVGs.
// Run: node scripts/generate-waves.mjs   (outputs to public/waves/)
import { writeFileSync, mkdirSync } from "node:fs";

const W = 1200, H = 700, STEPS = 40;
const variants = {
  hero: { lines: 44, seed: 0.6 },
  page: { lines: 32, seed: 1.4 },
  cta: { lines: 24, seed: 2.2 },
  work: { lines: 22, seed: 3.1 },
};

function path(t, seed) {
  let d = "";
  for (let s = 0; s <= STEPS; s++) {
    const u = s / STEPS;
    const x = Math.round(u * W);
    const y = Math.round(
      H * 0.62 - t * H * 0.38 +
      Math.sin(u * Math.PI * 1.6 + t * 2.4 + seed) * (H * 0.16) * (0.4 + t) +
      Math.cos(u * Math.PI * 3.1 - t * 1.7 + seed * 0.5) * (H * 0.05) * (1 - t * 0.5)
    );
    d += (s === 0 ? "M" : "L") + x + " " + y;
  }
  return d;
}

mkdirSync("public/waves", { recursive: true });
for (const [name, { lines, seed }] of Object.entries(variants)) {
  const paths = Array.from({ length: lines }, (_, i) => `<path d="${path(i / (lines - 1), seed)}"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2bb3d4" stop-opacity=".15"/><stop offset=".55" stop-color="#2bb3d4" stop-opacity=".7"/><stop offset="1" stop-color="#7aa7ff" stop-opacity=".35"/></linearGradient></defs><g fill="none" stroke="url(#g)" stroke-width="1">${paths}</g></svg>`;
  writeFileSync(`public/waves/${name}.svg`, svg);
  console.log(name, svg.length, "bytes");
}
