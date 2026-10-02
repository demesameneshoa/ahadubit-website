import Link from "next/link";
import Icon from "@/components/Icon";
import Waves from "@/components/Waves";

export default function NotFound() {
  return (
    <section className="page-hero page-hero--full">
      <div className="page-hero__bg">
        <Waves tone="dark" lines={34} seed={1.9} />
      </div>
      <div className="container page-hero__inner center">
        <p className="eyebrow eyebrow--light">Error 404</p>
        <h1 className="page-hero__title">This page took a different route.</h1>
        <p className="page-hero__intro">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn btn--primary">
          Back to home <Icon name="arrow" size={18} />
        </Link>
      </div>
    </section>
  );
}
