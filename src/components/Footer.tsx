import Link from "next/link";
import { HermesMark } from "@/components/Mark";
import { site } from "@/content/site";
import { pages } from "@/content/pages";

export function Footer() {
  const { links } = site;
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <HermesMark className="footer-mark" />
          <p className="footer-word">HERMÈS</p>
          <p className="footer-sub">SEO &amp; référencement naturel · GEO &amp; visibilité IA</p>
          <p className="footer-group">
            Une activité du{" "}
            <a href={site.group.url} target="_blank" rel="noopener">
              Groupe BOURASSEAU
            </a>
            .
          </p>
        </div>
        <nav className="footer-col" aria-label="Expertises">
          <p className="mono">Expertises</p>
          <ul>
            {pages.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link href={p.path}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Zones d'intervention">
          <p className="mono">Zones</p>
          <ul>
            {pages.slice(4).map((p) => (
              <li key={p.slug}>
                <Link href={p.path}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Groupe BOURASSEAU">
          <p className="mono">Le groupe</p>
          <ul>
            <li>
              <a href={site.group.url} target="_blank" rel="noopener">
                Groupe BOURASSEAU
              </a>
            </li>
            {links.apollon ? (
              <li>
                <a href={links.apollon} target="_blank" rel="noopener">
                  Apollon — création de sites
                </a>
              </li>
            ) : null}
            {links.athena ? (
              <li>
                <a href={links.athena} target="_blank" rel="noopener">
                  Athéna — agents IA
                </a>
              </li>
            ) : null}
            <li>
              <a href={links.synatrap} target="_blank" rel="noopener">
                SYNATRAP
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer-col">
          <p className="mono">Contact</p>
          <ul>
            <li>
              <Link href="/contact">Formulaire de contact</Link>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p className="footer-manifesto">{site.manifesto}</p>
        <ul className="footer-legal">
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </li>
          <li>
            <span>Aucun cookie de suivi</span>
          </li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} Hermès · Groupe BOURASSEAU</p>
      </div>
    </footer>
  );
}
