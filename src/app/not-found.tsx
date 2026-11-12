import Link from "next/link";
import { HermesMark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="nf section">
      <div className="wrap nf-inner">
        <HermesMark detailed className="nf-mark" />
        <p className="kicker">Erreur 404</p>
        <h1 className="lp-title">Même Hermès n&apos;a pas trouvé cette page.</h1>
        <p className="lp-lead">Elle a peut-être été déplacée. Voici quelques chemins pour reprendre la route.</p>
        <ul className="nf-links">
          <li>
            <Link href="/" className="link-arrow">Accueil</Link>
          </li>
          <li>
            <Link href="/seo" className="link-arrow">Expertise SEO</Link>
          </li>
          <li>
            <Link href="/geo" className="link-arrow">Expertise GEO</Link>
          </li>
          <li>
            <Link href="/contact" className="link-arrow link-arrow-gold">Contact</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
