import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

const rows: { label: string; value: string | null }[] = [
  { label: "Éditeur", value: site.legal.publisher },
  { label: "Statut juridique", value: site.legal.status },
  { label: "SIREN", value: site.legal.siren },
  { label: "Adresse", value: site.legal.address },
  { label: "Directeur de la publication", value: site.legal.publicationDirector },
  { label: "Contact", value: site.contact.email },
  { label: "Hébergeur", value: site.legal.host },
];

export default function MentionsLegales() {
  const complete = rows.every((r) => r.value);
  return (
    <section className="legal section">
      <div className="wrap legal-inner">
        <p className="kicker">Informations</p>
        <h1 className="lp-title">Mentions légales</h1>
        {!complete ? <p className="notice">Certaines informations légales sont en cours de complétion.</p> : null}
        <dl className="legal-list">
          {rows
            .filter((r) => r.value)
            .map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
        </dl>
        <h2>Activité</h2>
        <p>
          Hermès est une activité du{" "}
          <a href={site.group.url} target="_blank" rel="noopener">
            Groupe BOURASSEAU
          </a>{" "}
          consacrée au référencement naturel (SEO) et à la visibilité dans les moteurs de recherche génératifs (GEO).
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, éléments graphiques et animations de ce site sont protégés. Toute reproduction sans autorisation
          préalable est interdite.
        </p>
      </div>
    </section>
  );
}
