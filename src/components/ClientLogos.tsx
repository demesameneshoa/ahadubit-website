import Image from "next/image";
import { clientLogos } from "@/data/site";

/** Static grid of client logos — proof, not decoration, so it doesn't move. */
export default function ClientLogos({ limit, className = "" }: { limit?: number; className?: string }) {
  const list = typeof limit === "number" ? clientLogos.slice(0, limit) : clientLogos;
  return (
    <ul className={`logo-grid ${className}`} aria-label="Organizations we have worked with">
      {list.map((c) => (
        <li key={c.name} className="logo-grid__item">
          <Image src={c.logo} alt={c.name} width={140} height={80} />
        </li>
      ))}
    </ul>
  );
}
