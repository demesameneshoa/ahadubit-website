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
    <section className="page-hero">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link prefetch={false} href="/">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="page-hero__title" data-reveal>
          {title}
        </h1>
        {intro && (
          <p className="page-hero__intro" data-reveal>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
