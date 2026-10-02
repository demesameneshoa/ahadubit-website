import Image from "next/image";
import { clientLogos } from "@/data/site";

export default function ClientMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="marquee" aria-label="Organizations we have worked with">
      <ul className="marquee__track">
        {row.map((c, i) => (
          <li key={`${c.name}-${i}`} className="marquee__item" aria-hidden={i >= clientLogos.length ? true : undefined}>
            <Image src={c.logo} alt={i >= clientLogos.length ? "" : c.name} width={160} height={90} />
          </li>
        ))}
      </ul>
    </div>
  );
}
