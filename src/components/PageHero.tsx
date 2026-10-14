import Link from "next/link";

export default function PageHero({
  title,
  intro,
  crumb,
}: {
  title: React.ReactNode;
  intro?: string;
  crumb: string;
}) {
  return (
    <section className="page-hero" data-scroll="exit">
      <div className="container">
        <nav className="crumbs hero-in" aria-label="Breadcrumb" style={{ ["--d" as string]: 0 } as React.CSSProperties}>
          <Link prefetch={false} href="/">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="page-hero__title hero-in" style={{ ["--d" as string]: 1 } as React.CSSProperties}>
          {title}
        </h1>
        {intro && (
          <p className="page-hero__intro hero-in" style={{ ["--d" as string]: 2 } as React.CSSProperties}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
