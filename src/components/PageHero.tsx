import Link from "next/link";
import Waves from "./Waves";

export default function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  crumb: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" data-parallax="0.15">
        <Waves tone="dark" lines={34} seed={1.4} />
      </div>
      <div className="pixel-grid page-hero__pixels" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="container page-hero__inner">
        <nav className="crumbs" aria-label="Breadcrumb" data-reveal="fade">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <p className="eyebrow eyebrow--light" data-reveal="up">
          {eyebrow}
        </p>
        <h1 className="page-hero__title" data-reveal="up" data-delay="80">
          {title}
        </h1>
        {intro && (
          <p className="page-hero__intro" data-reveal="up" data-delay="160">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
