/**
 * Contour-line "wave surface" — echoes the wireframe waves in the Ahadubit
 * company profile. Paths are generated deterministically so server and
 * client output match.
 */
function buildPaths(count: number, width: number, height: number, seed: number) {
  const paths: string[] = [];
  const steps = 48;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    let d = "";
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * width;
      const u = s / steps;
      const y =
        height * 0.62 -
        t * height * 0.38 +
        Math.sin(u * Math.PI * 1.6 + t * 2.4 + seed) * (height * 0.16) * (0.4 + t) +
        Math.cos(u * Math.PI * 3.1 - t * 1.7 + seed * 0.5) * (height * 0.05) * (1 - t * 0.5);
      d += s === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)}` : ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(d);
  }
  return paths;
}

export default function Waves({
  className = "",
  lines = 42,
  seed = 0.6,
  tone = "light",
}: {
  className?: string;
  lines?: number;
  seed?: number;
  tone?: "light" | "dark";
}) {
  const w = 1200;
  const h = 700;
  const a = buildPaths(lines, w, h, seed);
  const gid = `wave-grad-${tone}-${Math.round(seed * 100)}`;
  return (
    <svg
      className={`waves waves--${tone} ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tone === "dark" ? "#2bb3d4" : "#0049ad"} stopOpacity="0.15" />
          <stop offset="55%" stopColor="#2bb3d4" stopOpacity={tone === "dark" ? "0.7" : "0.55"} />
          <stop offset="100%" stopColor={tone === "dark" ? "#7aa7ff" : "#0049ad"} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g className="waves__drift" stroke={`url(#${gid})`} fill="none" strokeWidth="1">
        {a.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
