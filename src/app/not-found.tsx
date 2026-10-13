import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero page-hero--notfound">
      <div className="container">
        <p className="page-hero__kicker">Error 404</p>
        <h1 className="page-hero__title">This page can&apos;t be found.</h1>
        <p className="page-hero__intro">It may have moved, or the link may be mistyped.</p>
        <div className="hero__actions">
          <Link prefetch={false} href="/" className="btn btn--primary">
            Go to Home
          </Link>
          <Link prefetch={false} href="/contact" className="btn btn--secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
